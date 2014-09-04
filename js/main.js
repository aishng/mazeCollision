var canvas = document.getElementById('board'),
	ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;
window.addEventListener('keydown', movePiece, false); //callback

var PIECE_RADIUS = 5; //all caps for constant

var BLOCK_SIZE = 10; //all caps for constant

var SPEED = 5;

// ctx.strokeStyle = "pink";
// ctx.strokeRect(5,5,25,25);

function drawBoard(w,h,ctx){
	ctx.strokeStyle = "blue";
	ctx.strokeRect(0,0, h * BLOCK_SIZE , w * BLOCK_SIZE );
}

var piece = {
	x : 2,
	y : 2,
	radius : PIECE_RADIUS
}

function drawPiece(x,y,ctx) {
	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.arc(x,y,PIECE_RADIUS,0,Math.PI*2,0);
	ctx.fill();

}

function drawAll (ctx) {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBoard(40,40,ctx);
	drawPiece(piece.x, piece.y, ctx);
}

function movePiece(e) {
	if (e.keyCode == 37){
		piece.x -= SPEED;
	}
	if (e.keyCode == 38){
		piece.y -= SPEED;
	}
	if (e.keyCode == 39){
		piece.x += SPEED;
	}
	if (e.keyCode == 40) {
		piece.y += SPEED;
	}
	drawAll(ctx);
}

drawAll(ctx);