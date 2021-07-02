
let el = document.getElementById("root")

// Context
const gl = el.getContext("webgl")
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const shaders = {}

// Vertex shader
shaders.vertex = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(shaders.vertex, `
    attribute vec4 vertexPosition;

    uniform mat4 modelView;
    uniform mat4 projection;

    void main() {
        gl_Position = projection * modelView * vertexPosition;
    }
`)
gl.compileShader(shaders.vertex)

// Fragment shader
shaders.fragment = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(shaders.fragment, `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`)
gl.compileShader(shaders.fragment)

// Shader program
const program = gl.createProgram()
gl.attachShader(program, shaders.vertex)
gl.attachShader(program, shaders.fragment)
gl.linkProgram()

// Buffers
const buffers = {}
buffers.position = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)

const positions = new Float32Array([
    -1.0,  1.0,
     1.0,  1.0,
    -1.0, -1.0,
     1.0, -1.0,
])
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

// TODO finish tutorial

