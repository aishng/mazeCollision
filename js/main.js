var canvas = document.getElementById('board'), 
	ctx = canvas.getContext('2d'); 

var canvas2 = document.getElementById('preview'),
	ctx2 = canvas2.getContext('2d');

canvas.width = 0;
canvas.height = 0;
window.addEventListener('keydown', movePiece, false); //callback function to move the game piece

canvas2.width = 200;
canvas2.height = 200;

var PIECE_RADIUS = 5; //all caps for constant
var BLOCK_SIZE = 10; 
var SPEED = 2;
var POSX = 22;
var POSY = 22;
var img = new Image();

// ctx.strokeStyle = "pink";
// ctx.strokeRect(5,5,25,25);

function loadImages(callback){ //callback is a function
	img.src = "images/maze.png";
	img.onload = callback; 
}

function drawBoard(w,h,ctx){
	ctx.strokeStyle = "blue";
	ctx.strokeRect(0,0, h * BLOCK_SIZE , w * BLOCK_SIZE );
}

var piece = {
	x : POSX,
	y : POSY,
	radius : PIECE_RADIUS
}

function drawPiece(x,y,ctx) {
	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.arc(x,y,PIECE_RADIUS,0,Math.PI*2,0);
	ctx.fill();
}

function drawMaze(ctx){
	ctx.drawImage(img, 0, 0);
}

function winData (ctx){
	var piecePadding = PIECE_RADIUS +1;
	var winData = ctx.getImageData(piece.x - piecePadding,piece.y - piecePadding,piecePadding*2,piecePadding*2);
	return winData;
}

function imageData(ctx, ctx2) {
	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	preview = winData(ctx);
// 	ctx2.putImageData(preview,0,0);	
}

function drawAll (ctx, ctx2) {
	canvas.width  = img.width;
	canvas.height = img.height;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawMaze(ctx);
	//drawBoard(40,40,ctx);
	drawPiece(piece.x, piece.y, ctx);
	imageData(ctx, ctx2);
}
function detectCollision(winData){
	var topLeft = winData.data[0] == 0;
	var topRight = winData.data[44] == 0;
	var bottomLeft = winData.data[528] == 0;
	var bottomRight = winData.data[572] == 0;

	var colString = "";

	if (topLeft || topRight){
		colString += "TOP";
		console.log('detected black TOP');
	}
	if (topRight || bottomRight){
		colString += "RIGHT";
		console.log('detected black RIGHT')
	}
	if (topLeft || bottomLeft){
		colString += "LEFT";
		console.log('detected black LEFT')
	}
	if (bottomRight || bottomLeft){
		colString += "BOTTOM";
		console.log('detected black BOTTOM')
	}

	return colString;
}

function movePiece(e) {
	e.preventDefault();
	var collisions = detectCollision(winData(ctx));

	if (e.keyCode == 37 && collisions.indexOf("LEFT") < 0){
		piece.x -= SPEED;
	}
	if (e.keyCode == 38 && collisions.indexOf("TOP") < 0){
		piece.y -= SPEED;
	}
	if (e.keyCode == 39 && collisions.indexOf("RIGHT") < 0){
		piece.x += SPEED;
	}
	if (e.keyCode == 40 && collisions.indexOf("BOTTOM") < 0) {
		piece.y += SPEED;
	}
	drawAll(ctx, ctx2);
}

loadImages(drawAll.bind(this, ctx, ctx2)); //passing a function into loadImages aka a callback function
//bind function so we can pass drawAll's parameter as well (ctx)
