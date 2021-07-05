import * as mat4 from "gl-mat4"
import fragmentSource from "./shaders/fragment.glsl"
import vertexSource from "./shaders/vertex.glsl"

let el = document.getElementById("root")

// Context
const gl = el.getContext("webgl")

const shaders = {}

// Vertex shader
shaders.vertex = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(shaders.vertex, vertexSource)
gl.compileShader(shaders.vertex)

// Fragment shader
shaders.fragment = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(shaders.fragment, fragmentSource)
gl.compileShader(shaders.fragment)

// Shader program
const program = gl.createProgram()
gl.attachShader(program, shaders.vertex)
gl.attachShader(program, shaders.fragment)
gl.linkProgram(program)
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
}

// Buffers
const buffers = {}

const positions = new Float32Array([
    -1.0,  1.0,
     1.0,  1.0,
    -1.0, -1.0,
     1.0, -1.0,
    -1.0, -2.0,
     1.0, -2.0,
])
buffers.position = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)


const colors = new Float32Array([
    1.0, 1.0, 1.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
])
buffers.colors = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colors)
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)


// Locations
const locations = {
    attributes: {
        vertexPosition: gl.getAttribLocation(program, "vertexPosition"),
        vertexColor: gl.getAttribLocation(program, "vertexColor")
    },
    uniforms: {
        projection: gl.getUniformLocation(program, "projection"),
        modelView: gl.getUniformLocation(program, "modelView")
    }
}

// Render scene
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clearDepth(1.0)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

const fieldOfView = 45 * Math.PI / 180
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
const z = {
    near: 0.1,
    far: 100.0
}
const projection = mat4.create()
mat4.perspective(projection, fieldOfView, aspect, z.near, z.far)

const modelView = mat4.create()
mat4.translate(modelView, modelView, [-0.0, 0.0, -6.0])
console.log(modelView)

// Bind attribute buffer to data
gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
gl.vertexAttribPointer(
    locations.attributes.vertexPosition, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(
    locations.attributes.vertexPosition
)

// Bind color array buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colors)
gl.vertexAttribPointer(
    locations.attributes.vertexColor, 4, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(
    locations.attributes.vertexColor
)

gl.useProgram(program)

gl.uniformMatrix4fv(
    locations.uniforms.projection,
    false,
    projection
)
gl.uniformMatrix4fv(
    locations.uniforms.modelView,
    false,
    modelView
)
const offset = 0
const vertexCount = positions.length / 2
gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
