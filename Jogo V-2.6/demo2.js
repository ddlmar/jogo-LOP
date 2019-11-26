var canvas; // var do canvas

var ctx;    // var do contexto

var mvLeft = false, mvRight = false,
mvUp = false, mvDown = false, dash = false,
char_atack = false;

var side = 0;

var maxjump = 1;

var status_game;

var barra = {   // barra de vida do personagem

    posX: 15,   // posição no eixo x
    posY: 20,   // posição no eixo y
    width: 200, // largura
    height: 20, // altura
    color: "#FF0000",  // cor

    draw: function(){   // desenhar a barra de vida
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY,this.width,this.height);
    },
    
};

var game = {
    pause: 0,
    play: 1,
    lose: 2,
    pause_menu: function(){
        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('clique para iniciar',canvas.width/2,canvas.height/2);
        ctx.fillText('K para atacar',canvas.width/2,canvas.height/2-120);
        ctx.fillText('J para dash',canvas.width/2,canvas.height/2-80);
        ctx.fillText('use WASD para movimentação',canvas.width/2,canvas.height/2 - 40);
        
        
    },
    end_menu: function(){
        ctx.fillStyle = '#fff';
        ctx.font = '40px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('aperte F5 para reiniciar',canvas.width/2,canvas.height/2);
    }
};

var character = {   // personagem
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
    // propriedades da arma 
    Wpn_width: 70,
    Wpn_height: 10,
    Wpn_color: "#6C3B6D",

    draw: function(){   // method para desenha-lo

        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);

    },
    gravity: function(){    // gravidade

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
    wpn_draw: function(){   // desenhar a arma do personagem
        if (char_atack && side == 2) {
            ctx.fillStyle = this.Wpn_color;
            ctx.fillRect(this.posX+this.width-7,this.posY-30,this.Wpn_width,this.Wpn_height);
        }
        if (char_atack && side == 1) {
            ctx.fillStyle = this.Wpn_color;
            ctx.fillRect(this.posX-this.Wpn_width+7,this.posY-30,this.Wpn_width,this.Wpn_height);    
        }
    },
}
        
var boss1 = {   //enemy

    width: 70,
    height: 100, 
    posX: 1200, 
    posY: 600,
    velocidade: 0,
    gravidade: 1,
    colour: "#0D5218",
    life: 100,

    draw: function(){  
        if (this.life > 0) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.posX,this.posY-this.height,this.width,this.height);    
        }
    },
    //mudará no futuro
    moveboss1: function(){

    if(character.posX > this.posX + this.width){
        this.posX += 3;

    }

    if(character.posX < this.posX - character.width){
        this.posX -= 3;

        }
    }
};

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

function char_vida(){   // atualização da barra de vida

    if(character.posX >= boss1.posX - character.width &&
        barra.width > 0 &&
        character.posX < boss1.posX + boss1.width && 
        character.posY + character.height > boss1.posY){
        character.vida -= 3;
        barra.width -= 3;

    }
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

        case 75:

            char_atack = true;

            break;
    }

}

function start(event){
    if (status_game == game.pause) {
        status_game = game.start;
    }
    
}

function tela_inicial(){
    if (status_game == game.pause) {
        game.pause_menu();
    }
    if (status_game == game.lose) {
        game.end_menu();
       
    }
}

function keyupHandler (e){

    var key = e.keyCode;

    switch(key){

        case 87:    // tecla W

            mvUp = false;

            break;

        case 83:    // tecla S

            mvDown = false;

            break;

        case 65:    // tecla A   

            mvLeft = false;

            break;

        case 68:    // tecla D

            mvRight = false;

            break;

        case 74:    // tecla J

            dash = false;

            break;

        case 75:    // tecla K

            char_atack = false;

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

        character.posX -= 7;
        character.dash();
        side = 1;   // lado que o personagem olhou por ultimo
    }

    if (mvRight) {

        character.posX += 7;
        character.dash();
        side = 2;   // lado que o personagem olhou por ultimo
    }   

}

function draw (){   // desenhar tela e personagens   
    ctx.fillStyle = "#B1CEE1";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if (status_game == game.pause) {
        tela_inicial();
    }
    if (status_game == game.start) {
        boss1.draw();
        barra.draw();
        character.draw();
    }
    if (character.vida <= 0) {
        status_game = game.lose;
    }
    if (status_game == game.lose) {
        tela_inicial();
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
        character.wpn_draw();
        boss1.moveboss1();
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