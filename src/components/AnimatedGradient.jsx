import { useEffect, useRef } from 'react'
import './AnimatedGradient.css'

/**
 * Soft blobs of colour drifting slowly behind a section, blending into a
 * moving gradient. Drawn with WebGL (built into the browser, no library) so
 * every pixel is worked out at full precision and lightly dithered: dark CSS
 * gradients show visible rings (banding), this does not.
 *
 * colors: hex colours, one blob each. background: colour under the blobs.
 * duration: seconds for one loop; each blob varies a little around it.
 * coveredBy: selector of the section that slides over this one; once it
 * fully covers it, the animation pauses.
 *
 * The gradient fills the screen (position: fixed) behind the page.
 */
const MAX_BLOBS = 8

const VERTEX_SHADER = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 resolution;
uniform vec3 background;
uniform int count;
uniform vec3 colors[${MAX_BLOBS}];
uniform vec3 blobs[${MAX_BLOBS}]; // x, y (pixels), radius (pixels)

// Cheap per-pixel noise for dithering.
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 p = gl_FragCoord.xy;
  vec3 colour = background;
  for (int i = 0; i < ${MAX_BLOBS}; i++) {
    if (i >= count) break;
    float d = distance(p, blobs[i].xy) / blobs[i].z;
    // Smooth fall-off to nothing at the edge: no visible ring.
    float weight = 1.0 - smoothstep(0.0, 1.0, d);
    colour = mix(colour, colors[i], weight * weight);
  }
  // Spread each pixel by up to one shade so the steps between shades vanish.
  colour += (hash(p) + hash(p + 0.37) - 1.0) / 255.0;
  gl_FragColor = vec4(colour, 1.0);
}
`

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

// Each blob: a random start point and four random waypoints it loops through.
const makeBlob = (index, total, duration) => {
  const waypoints = [[0, 0]]
  for (let i = 0; i < 4; i++) waypoints.push([Math.random() - 0.5, Math.random() - 0.5])
  return {
    x: Math.random(),
    y: Math.random(),
    waypoints,
    period: duration * (0.8 + Math.random() * 0.4),
    offset: (index / total) * duration,
  }
}

// Where a blob is at a given time, as an offset in units of its size.
const blobOffset = (blob, seconds) => {
  const t = (((seconds + blob.offset) % blob.period) / blob.period) * 5
  const step = Math.floor(t)
  const [ax, ay] = blob.waypoints[step]
  const [bx, by] = blob.waypoints[(step + 1) % 5]
  const k = easeInOut(t - step)
  return [ax + (bx - ax) * k, ay + (by - ay) * k]
}

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

export default function AnimatedGradient({ colors, background = '#111111', duration = 24, coveredBy }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas.parentElement
    const options = { antialias: false, alpha: false }
    // Without hardware acceleration the browser cannot keep a live full-screen
    // canvas painted while sections slide over it: it leaves white smears.
    // Then draw one frame, turn it into a still background image and drop
    // the canvas.
    let gl = canvas.getContext('webgl', { ...options, failIfMajorPerformanceCaveat: true })
    const stillOnly = !gl
    if (!gl) gl = canvas.getContext('webgl', { ...options, preserveDrawingBuffer: true })
    if (!gl) {
      container.classList.add('animated-gradient--fallback')
      return undefined
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vertex || !fragment) {
      container.classList.add('animated-gradient--fallback')
      return undefined
    }
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.useProgram(program)

    // One triangle pair covering the canvas.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniform = (name) => gl.getUniformLocation(program, name)
    const used = colors.slice(0, MAX_BLOBS)
    gl.uniform1i(uniform('count'), used.length)
    gl.uniform3fv(uniform('colors'), used.flatMap(hexToRgb))
    gl.uniform3fv(uniform('background'), hexToRgb(background))
    const resolutionLocation = uniform('resolution')
    const blobsLocation = uniform('blobs')

    const blobs = used.map((_, index) => makeBlob(index, used.length, duration))
    const blobData = new Float32Array(MAX_BLOBS * 3)

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(container.clientWidth * scale)
      canvas.height = Math.round(container.clientHeight * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    }

    const draw = (seconds) => {
      const { width, height } = canvas
      const size = 0.7 * Math.max(width, height)
      blobs.forEach((blob, i) => {
        const [dx, dy] = blobOffset(blob, seconds)
        blobData[i * 3] = blob.x * width + dx * size
        blobData[i * 3 + 1] = blob.y * height + dy * size
        blobData[i * 3 + 2] = size / 2
      })
      gl.uniform3fv(blobsLocation, blobData)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    if (stillOnly) {
      let timer = 0
      const snapshot = () => {
        resize()
        draw(0)
        container.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
        container.classList.add('animated-gradient--still')
      }
      const onResize = () => {
        clearTimeout(timer)
        timer = setTimeout(snapshot, 200)
      }
      snapshot()
      window.addEventListener('resize', onResize)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', onResize)
      }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cover = coveredBy ? document.querySelector(coveredBy) : null
    const header = document.querySelector('.header')
    let frame = 0
    let covered = false
    // Animation clock that only runs while drawing, so after a pause the
    // blobs carry on from where they were instead of jumping.
    let elapsed = 0
    let lastNow = 0

    const loop = (now) => {
      if (lastNow) elapsed += Math.min(now - lastNow, 100) / 1000
      lastNow = now
      draw(elapsed)
      frame = requestAnimationFrame(loop)
    }
    const run = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lastNow = 0
      if (covered) return
      if (reducedMotion.matches) draw(elapsed)
      else frame = requestAnimationFrame(loop)
    }

    // Pause once the next section has slid fully over this one. (It stays
    // shown: hiding and re-showing it forces a full redraw mid-scroll.)
    const checkCovered = () => {
      if (!cover) return
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0
      const nowCovered = cover.getBoundingClientRect().top <= headerBottom
      if (nowCovered !== covered) {
        covered = nowCovered
        run()
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (!frame && !covered) draw(elapsed)
    })
    resizeObserver.observe(canvas)

    resize()
    checkCovered()
    run()
    window.addEventListener('scroll', checkCovered, { passive: true })
    window.addEventListener('resize', checkCovered)
    reducedMotion.addEventListener('change', run)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', checkCovered)
      window.removeEventListener('resize', checkCovered)
      reducedMotion.removeEventListener('change', run)
    }
  }, [colors, background, duration, coveredBy])

  return (
    <div className="animated-gradient" aria-hidden="true">
      <canvas ref={canvasRef} className="animated-gradient__canvas" />
    </div>
  )
}
