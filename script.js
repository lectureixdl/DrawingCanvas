var context;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

function redraw(){
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
	context.strokeStyle = "#df4b26";
	context.lineJoin = "round";
	context.lineWidth = 5;
  			
	for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
}


$(document).ready(function() {
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
	context = document.getElementById('drawingCanvas').getContext("2d");
	$('#drawingCanvas').attr("width", window.innerWidth);
	$('#drawingCanvas').attr("height", window.innerHeight);

	$('#drawingCanvas').mousedown(function(e){
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		redraw();
	});
	$('#drawingCanvas').mousemove(function(e){
		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});
	$('#drawingCanvas').mouseup(function(e){
		paint = false;
	});
	$('#drawingCanvas').mouseleave(function(e){
		paint = false;
	});
});

$(window).on("resize", function() {
	$('#drawingCanvas').attr("width", window.innerWidth);
	$('#drawingCanvas').attr("height", window.innerHeight);
});
