	var ctx;
	var scr_y;
	var scr_x;
	var frame = 0;
	var canvas;
	var maxPulo = 2;
	var bloco = {
		x: 50,
		y: 0,
		width: 50,
		height: 50,
		color: "#E0FFFF",
		velocidade: 0,
		gravidade: 1.5,
		pulo: 15,
		qntPulo: 0,
		cor: function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		},
		atualizar: function(){
			this.velocidade += this.gravidade;
			this.y += this.velocidade;
			if (this.y > footer.y - this.height) {
				this.y = footer.y - this.height;
				this.qntPulo = 0;
			}
		},
		pula: function(){
			if (this.qntPulo < maxPulo) {
				this.qntPulo++;
				this.velocidade = - this.pulo;
			}
		},
	};

	var	footer = {
		height: 50,
		y: 550,
		color: "#7FFF00",

		cor: function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,this.y,scr_x,this.height);
		}

	};
	function main () {
	
	
		canvas  = document.createElement("canvas");
		canvas.width = 1000;
		canvas.height = 600;
		scr_y = canvas.height;
		scr_x = canvas.width;
		canvas.style.border = "1px  solid black";

		ctx = canvas.getContext("2d");	
		document.body.appendChild(canvas);
		document.addEventListener("keydown",click);
		jogo();

	}
	function click(event){
		bloco.pula();
	}
	function jogo (){
		atualizar();
		cor();
		window.requestAnimationFrame(jogo);
	}
	function atualizar (){
		frame++;
		bloco.atualizar();
	}
	function cor (){
		ctx.fillStyle = "#C71585";
		ctx.fillRect(0,0,scr_x,scr_y);
		bloco.cor();
		footer.cor();
	}
	
	
	main ();