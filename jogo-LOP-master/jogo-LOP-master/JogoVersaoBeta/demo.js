canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// window.addEventListener("Keydown", KeydownHandler , false);

canvas.width = 1300 //window.innerWidth;	// tamanho da largura da tela
canvas.height = 600 //window.innerHeight;	// tamanho da altura da tela

ctx = canvas.getContext('2d');	// o formato que será feito os desenhos "2d"

var canvas;	// var do canvas
var ctx;	// var do contexto


const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40; // constante de movimentação  
var mvLeft = mvRight = mvUp = mvDown = false;

var character = {	//personagem
	width: 30,	// largura
	height: 50,	// altura
	posX: 10, 
	posY: canvas.height,
	color: "#2a1db9",	// cor
	draw: function(){	// method para desenha-lo
		ctx.fillStyle = this.color;
		ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);
	}

	
};


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