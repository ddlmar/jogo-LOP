var canvas;	// var do canvas
var ctx;	// var do contexto


const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40; // constante de movimentação  

var character = {	//personagem
	width: 30,	// largura
	height: 50,	// altura
	color: "#2a1db9",	// cor
	draw: function(){	// method para desenha-lo
		ctx.fillStyle = this.color;
		ctx.fillRect(10,canvas.height-this.height,this.width,this.height);
	}
}

canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width = window.innerWidth;	// tamanho da largura da tela
canvas.height = window.innerHeight;	// tamanho da altura da tela

ctx = canvas.getContext('2d');	// o formato que será feito os desenhos "2d"

function draw (){	// desenhar tela e personagens
	
	ctx.fillStyle = "#00f";
	character.draw();
	
}

function update (){	// atualização de informações
	draw();
}

function loop (){	// repetição
	update();
	window.requestAnimationFrame(loop,ctx);
}

function main (){	// principal
	loop();
}



main();