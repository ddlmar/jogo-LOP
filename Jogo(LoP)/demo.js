var canvas; // var do canvas

var ctx;    // var do contexto


var mvLeft = false, mvRight = false, mvUp = false, mvDown = false;

var maxJump = 2;

var character = {   //personagem

    width: 30,  // largura

    height: 50, // altura

    posX: 50, 

    posY: 50,

    velocidade: 0,

    gravidade: 1.5,

    qntJ: 0,

    jump: 28,

    color: "#8B0000",   // cor

    draw: function(){   // method para desenha-lo

        ctx.fillStyle = this.color;

        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);

    },

    gravity: function(){

            this.velocidade += this.gravidade;

            this.posY += this.velocidade;

            if( this.posY > ground.height){
            	this.posY = ground.height;
            	this.qntJ = 0;
            }

        

    },
    charjump: function(){
    	if (this.qntJ < maxJump){
    		this.velocidade = - this.jump;
    		this.qntJ += 2;
    	}
    }

   

};



var ground = {

    width: 0,

    height: 550,

    color: "#0C280D",

    draw: function(){

        ctx.fillStyle = this.color;

        ctx.fillRect(this.width,this.height,canvas.width,this.height);

    }, 

};



function colide (){

    if (character.posY > ground.height - character.height) {

        character.posY = ground.height;

    }

    if (character.posY == ground.height) {

        character.gravity();

    }

}
// cima = 32 ("espaço"); direita = 68 ("D"); esquerda = 65 ("A") e baixo = 83 ("S")

function keydownHandler (e){

    var key = e.keyCode;

    switch(key){

        case 32:

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

        

    }

}



function keyupHandler (e){

    var key = e.keyCode;

    switch(key){

        case 32:

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

        

    }

}



function move_player (){

    if (mvUp) {

        character.charjump();

    }

    if (mvDown) {

        character.posY+=5;

    }

    if (mvLeft) {

        character.posX-=5;

    }

    if (mvRight) {

        character.posX+=5;

    }

    

}





function main (){   // principal

    canvas = document.createElement("canvas");

    document.body.appendChild(canvas);

    window.addEventListener("keydown", keydownHandler);

    window.addEventListener("keyup",keyupHandler);

    canvas.width = 1300 // tamanho da largura da tela

    canvas.height = 600 // tamanho da altura da tela

    ctx = canvas.getContext('2d');  // o formato que será feito os desenhos "2d"

    loop();   



}











function draw (){   // desenhar tela e personagens   

    ctx.fillStyle = "#030111";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    colide();

    ground.draw();   

    character.draw();    


    

    

}



function update (){ // atualização de informações       


    move_player();
    draw();      

}



function loop (){   // repetição

    

    update();    
	character.gravity();
    window.requestAnimationFrame(loop,ctx);   

}



main();