attribute vec4 vertexPosition;
attribute vec4 vertexColor;

uniform mat4 modelView;
uniform mat4 projection;

varying highp vec4 color;

void main() {
    gl_Position = projection * modelView * vertexPosition;
    color = vertexColor;
}
