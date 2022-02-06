/////////////////////////////////////////////////////////////////
//    Synidaemi i Tolvugrafik
//     Synir notkun a lyklabordsatburdum til ad hreyfa spada
//
//    Hjalmtyr Hafsteinsson, januar 2022
//
//
//    Utfaersla fyrir Verkefni 1, tolvugrafik 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;
var vertices = [
    vec2( -0.1, -0.90 ), // nedri
    vec2( -0.1, -0.70 ), // midja
    vec2(  0.05, -0.80 ) // efri
];
var kassi = [
  vec2( 0.5, -0.90 ), // nedri
  vec2( 0.5, -0.5 ), // midja
  vec2(  0.6, -0.90 ),
  vec2(0.6, -0.5 )
];

var bufferIdA;
var bufferId;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    //
    // bufferIdA = gl.createBuffer();
    // gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdA );
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(kassi), gl.STATIC_DRAW );

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var firstah = true;

    // Event listener for keyboard
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {

            case 37:	// vinstri or
                // count = 1;
                //mirrorTriangle(1);
                while (firstah == true) {
                  vertices[2][0] -= 0.3;
                  firstah = false;


                  break;
                }

                xmove = -0.05;
                ymove = 0.0;

                //vertices = vertices2;
                break;
                case 39:	// haegri

              while (firstah == false) {
                vertices[2][0] += 0.3;
                firstah = true;
                break;
              }

                xmove = 0.05;
                ymove = 0.0;

                break;
            case 38:   // hoppa


                xmove = 0.3;
                ymove = 0.7;
                // while (ymove > 0.0) {
                //   ymove -= 0.01
                //
                // }
                break;
            default:
                xmove = 0.0;
                ymove = 0.0;

              }

        for(i=0; i<3; i++) {
            vertices[i][0] += xmove;
            vertices[i][1] += ymove;
        }



        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    });

    render();
}


function render() {
  if(vertices[2][0] < -1.0){
    vertices[2][0] = 1.0;
    vertices[0][0] = 1.15;
    vertices[1][0] = 1.15;

  }
  if(vertices[2][0] > 1.0){
    vertices[2][0] = -1.0;
    vertices[0][0] = -1.15;
    vertices[1][0] = -1.15;

  }
   gl.clear( gl.COLOR_BUFFER_BIT );

  //
  //  gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdA );
  // gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  // gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  //
  // gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  // gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.drawArrays( gl.TRIANGLES, 0, 3 );

    window.requestAnimFrame(render);
}
