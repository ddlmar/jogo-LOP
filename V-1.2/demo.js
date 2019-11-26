var canvas; // var do canvas
var ctx;    // var do contexto

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40; // constante de movimentação  
var mvLeft = mvRight = mvUp = mvDown = false;

var character = {   //personagem
    width: 30,  // largura
    height: 50, // altura
    posX: 50, 
    posY: 500,
    velocity: 0,
    gravity: 0.7,
    maxJump: 2,
    jump: 0,
    jumpForce: 50,
    color: "#2a1db9",   // cor
    draw: function(){   // method para desenha-lo
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);
    },
   update: function(){ // gravidade
        this.velocity += this.gravity;
        this.posY += this.velocity;

        if(this.posY > ground.y - this.height){
            this.posY = ground.y;
        }
    },
   /* jump: function(){
        if (this.jump < this.maxJump) {
            this.jump++;
            this.velocity-= this.jumpForce;
        }
    },*/  
};

ground = {     // chao 
    y: 550,
    height: 50,
    colour: "#38531A",
    draw: function(){
        ctx.fillStyle = this.colour;
        ctx.fillRect( 0, this.y, canvas.width, this.height);
    }

}

function main (){   // principal
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    window.addEventListener("keydown", keydownHandler);
   // window.addEventListener("keydown", pulo);
   // window.addEventListener("Keyup", KeyupHandler, false);
    canvas.width = 1300 // tamanho da largura da tela
    canvas.height = 600 // tamanho da altura da tela
    ctx = canvas.getContext('2d');  // o formato que será feito os desenhos "2d"
    loop();   

}

function keydownHandler(e){ // evento de movimentação
    var key = e.keyCode;
    if (key === LEFT && key !== RIGHT) {
        character.posX-=7;
    }
    if (key === UP && key !== DOWN) {
        character.posY-=7;
    }
    if (key === RIGHT && key !== LEFT) {
        character.posX+=7; 
    }
    if (key === DOWN && key !== UP) {
        character.posY+=7;
    }
}


/*function pulo (e){
    var key = e.keyCode;
    if (key === 88) {
        character.jump();
    }
    
}*/
function draw (){   // desenhar tela e personagens   
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    character.draw();
    ground.draw();
    
}

function update (){ // atualização de informações       
   character.update();
    draw();      
}

function loop (){   // repetição
    update();    
    window.requestAnimationFrame(loop,ctx);   
}

main();