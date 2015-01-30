
var gl;
var points;
var index = 0;
var canvas;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //set sets of vertices i am using
    var vertices = [
		vec2( -0.5, -0.0 ),
        vec2(  0.0,  0.75 ),
        vec2(  0.5,  0.0 ),
		vec2(  0.0, -0.75 ),
		vec2( -0.5, -0.5 ),
        vec2(  0.0,  0.5 ),
        vec2(  0.5,  -0.5 ),
		vec2( -0.5, 0.5 ),
        vec2(  0.5, 0.5 ),
        vec2(  0.5, -0.5 ),
		vec2(  -0.5,  -0.5 )
		 
		];		
	
	//clicking input reader
	canvas.addEventListener("mousedown",function(){
		if(index == 0) {
		index = 1;
	}
		else if(index == 1) {
		index = 2;
	} 
		else if(index == 2) {
		index = 0;
	}
	});


    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    // shows each shape, and each shape is determined by a click of the mouse
    if (index == 0){
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	}
	else if (index == 1){
	gl.drawArrays( gl.TRIANGLES, 4, 3);
	}
	else if (index == 2){
	gl.drawArrays( gl.TRIANGLE_FAN, 7, 4 );
	}
	window.requestAnimFrame(render);
}

