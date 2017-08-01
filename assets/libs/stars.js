
export default class ZmitiStar {
	constructor(options) {
		this.x =  options.x;
		this.y =  options.y;
		this.speed =  options.speed;
		this.img = options.img;
		this.context = options.context;
		this.width = options.context.canvas.width;
		this.height = options.context.canvas.height;
	}

	init(){
		this.draw();
	}

	update(i){
		//this.context.clearRect(0,0,this.width,this.height);
		this.context.drawImage(this.img,i*7,0,7,7,this.x,this.y,7,7);
	}
	draw(i){
		var context = this.context;
		context.drawImage(this.img,14,0,7,7,this.x,this.y,7,7);
	}
}

