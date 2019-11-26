var canvas; // var do canvas
var ctx;    // var do contexto

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40; // constante de movimentação  
var mvLeft = false, mvRight = false, mvUp = false, mvDown = false;
var maxJump = 2;
var character = {   //personagem
    width: 30,  // largura
    height: 50, // altura
    posX: 50, 
    posY: 50,
    velocidade: 0,
    gravidade: 0.5,
    qntJ: 0,
    jump: 50,
    color: "#2a1db9",   // cor
    draw: function(){   // method para desenha-lo
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);
    },
    gravity: function(){
        if (this.posY < ground.height) {
            this.velocidade += this.gravidade;
            this.posY += this.velocidade;
        }
    },
   
};

var ground = {
    width: 0,
    height: 550,
    color: "#76CD2D",
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
function keydownHandler (event){
    var key = event.keyCode;
    switch(key){
        case UP:
            mvUp = true;
            break;
        case DOWN:
            mvDown = true;
            break;
        case LEFT:
            mvLeft = true;
            break;
        case RIGHT:
            mvRight = true;
            break;
        
    }
}

function keyupHandler (e){
    var key = e.keyCode;
    switch(key){
        case UP:
            mvUp = false;
            break;
        case DOWN:
            mvDown = false;
            break;
        case LEFT:
            mvLeft = false;
            break;
        case RIGHT:
            mvRight = false;
            break;
        
    }
}

function move_player (){
    if (mvUp) {
        character.posY-= character.jump;
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
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    colide();
    ground.draw();   
    character.draw();    
    character.gravity();
    
    
}

function update (){ // atualização de informações       
    move_player();
    draw();      
}

function loop (){   // repetição
    
    update();    
    window.requestAnimationFrame(loop,ctx);   
}

main();