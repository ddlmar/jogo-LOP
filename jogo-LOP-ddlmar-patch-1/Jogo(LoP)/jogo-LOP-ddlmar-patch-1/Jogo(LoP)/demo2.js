var canvas; // var do canvas

var ctx;    // var do contexto

var mvLeft = false, mvRight = false, mvUp = false, mvDown = false, dash = false;

var maxjump = 1;

var status_game;

var barra = {	// barra de vida do personagem

	posX: 15,	// posição no eixo x

	posY: 20,	// posição no eixo y

	width: 200,	// largura

	height: 20,	// altura

	color: "#fff",	// cor

	draw: function(){	// desenhar a barra de vida
		ctx.fillStyle = this.color;
		ctx.fillRect(this.posX,this.posY,this.width,this.height);
	},
	
};

var game = {
    pause: 0,
    play: 1,
    lose: 2,
};

var character = {   //personagem

    width: 30,  // largura

    height: 50, // altura

    posX: 50, 

    posY: 600,

    velocidade: 0,

    gravidade: 1,

    qntJ: 0,

    fjump: 10,

    vida: 200,

    char_dash: 30,

    color: "#8B0000",   // cor

    draw: function(){   // method para desenha-lo

        ctx.fillStyle = this.color;

        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);

    },
    gravity: function(){	// gravidade
    	this.velocidade += this.gravidade;
    	this.posY += this.velocidade;
    	if (this.posY > 600 + this.height) {
    		this.posY = 600 ;
    		this.qntJ = 0 ;
    	}
    	
	},
	jump: function(){ // pulo
		if (this.qntJ < maxjump) {
			this.qntJ++;
			this.velocidade = -20;
			this.posY = this.posY - this.fjump;
			

		}
	},
    dash: function(){   // dash do personagem
        if (mvRight && dash && stamina_bar.width > 10 ) {
            this.posX += this.char_dash;
            stamina_bar.width -= 20;
        }
        if (mvLeft && dash && stamina_bar.width > 10 ) {
            this.posX -= this.char_dash;
            stamina_bar.width -= 20;
        }
        if (stamina_bar.width > 200) {
            stamina_bar.width = 200;
        }
        if (stamina_bar.width < 200 || stamina_bar.width < 0) {
            stamina_bar.width++;
        }
        if (stamina_bar.width < 0) {
            stamina_bar.width = 0;
        }
    },
}

var stamina_bar = { // barra da stamina do personagem
    posX: 15,
    posY: 40,
    width: 200,
    height: 20,
    color: "#00FF00",

    draw: function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY,this.width,this.height);
    }
};

function char_vida(){	// atualização da barra de vida
	if (character.posX >= 1300 - character.width &&
	 barra.width > 0) {
		character.vida--;	
		barra.width--;
		
	}
	if (character.posX <= 0 &&
		barra.width > 0) {
		character.vida--;
		barra.width--;
		
	}
	
}

function colide (){ // colisao
	if (character.posX > 1300 - character.width) {
		character.posX = 1300 - character.width;
	}
	if (character.posX < 0) {
		character.posX = 0;
	}
	if (character.posY > 600) {
		character.posY = 600 ;
		character.velocidade = 0;
		character.qntJ = 0;
	}
	if (character.posY < 0 ) {
		character.posY = 0;
	}
}

function keydownHandler (e){ 

    var key = e.keyCode;

    switch(key){

        case 87:

            mvUp = true;

            break;

        case 83:

            mvDown = true;

            break;

        case 65:

            mvLeft = true;

            break;

        case 68:

            mvRight = true;

            break;

        case 74:

            dash = true;

            break;
    }

}

function start(event){
    if (status_game == game.pause) {
        status_game = game.start;
    }
}

function keyupHandler (e){

    var key = e.keyCode;

    switch(key){

        case 87:

            mvUp = false;

            break;

        case 83:

            mvDown = false;

            break;

        case 65:

            mvLeft = false;

            break;

        case 68:

            mvRight = false;

            break;

        case 74:

            dash = false;

            break;
    }

}



function move_player (){

    if (mvUp) {

        character.jump();
        //character.posY -= 15;
    }

    if (mvDown) {

        //character.posY += 5;

    }

    if (mvLeft) {

        character.posX -= m;
        character.dash();
    }

    if (mvRight) {

        character.posX += m;
        character.dash();
    }   

}

function draw (){   // desenhar tela e personagens   
    ctx.fillStyle = "#030111";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if (status_game == game.start) {
        barra.draw();
        character.draw();
    }
    if (character.vida == 0) {
        status_game = game.lose;
    }

}

function loop (){   // repetição
	update(); 	 	
    window.requestAnimationFrame(loop,ctx);   

}

function update (){ // atualização de informações       	  
	   draw();  
    if (status_game == game.start) {       
        move_player();   
        colide(); 
        char_vida();
        stamina_bar.draw();
        character.gravity();
    }
}

function main (){   // principal

    canvas = document.createElement("canvas");

    document.body.appendChild(canvas);

    window.addEventListener("keydown", keydownHandler);

    window.addEventListener("keyup", keyupHandler);

    window.addEventListener("mousedown", start);

    status_game = game.pause;

    canvas.width = 1300 // tamanho da largura da tela

    canvas.height = 600 // tamanho da altura da tela

    ctx = canvas.getContext('2d');  // o formato que será feito os desenhos "2d"

    loop();   



}

main();