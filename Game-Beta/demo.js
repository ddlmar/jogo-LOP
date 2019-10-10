canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// window.addEventListener("Keydown", KeydownHandler , false);

canvas.width = 1300 //window.innerWidth;    // tamanho da largura da tela
canvas.height = 600 //window.innerHeight;   // tamanho da altura da tela

ctx = canvas.getContext('2d');  // o formato que será feito os desenhos "2d"

var canvas; // var do canvas
var ctx;    // var do contexto


const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40; // constante de movimentação  
var mvLeft = mvRight = mvUp = mvDown = false;

var character = {   //personagem
    width: 30,  // largura
    height: 50, // altura
    posX: 10, 
    posY: 0,
    velocity: 0,
    gravity: 0.7,
    color: "#2a1db9",   // cor
    draw: function(){   // method para desenha-lo
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);
    },
    update: function(){
        this.velocity += this.gravity;
        this.posY += this.velocity;

        if(this.posY > ground.y - this.height){
            this.posY = ground.y;
        }
    }

    
};

ground = {
    y: 550,
    height: 50,
    colour: "#38531A",
    draw: function(){
        ctx.fillStyle = this.colour;
        ctx.fillRect( 0, this.y, canvas.width, this.height);
    }

}
function draw (){   // desenhar tela e personagens
    
    ctx.fillStyle = "#00f";
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

function main (){   // principal
    loop();
}



main();