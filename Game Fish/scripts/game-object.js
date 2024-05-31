export class GameObject{
    constructor(canvas,position,speed,direction,image){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.position = position;
        this.speed = speed;
        this.direction = direction;
        this.image = image;
        this.hitbox = {};
        this.opacity = 1;
    }
    drawHitbox(){
        this.ctx.beginPath();
        this.ctx.strokeRect(
            this.hitbox.x,
            this.hitbox.y,
            this.hitbox.width,
            this.hitbox.height
        );
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    draw(){

        this.hitbox = {
            x:this.position.x - this.image.width/4,
            y:this.position.y - this.image.height/4,
            width:this.image.width/2,
            height:this.image.height/2
        }

        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.scale(this.direction,1);
        this.ctx.translate(-this.position.x, -this.position.y);
        this.image.draw(this.ctx,this.position); 


        this.ctx.restore();
        //this.drawHitbox();
    }
    randomNumber(min,max,value){
        if(value){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return Math.random() * (max - min) + min;
    }
    isOutCanvas(){
        if(this.position.x - this.image.width/2 >= this.canvas.width||
            this.position.x + this.image.width/2 <= 0||
            this.position.y - this.image.height/2 >= this.canvas.height||
            this.position.y + this.image.height/2 <=0
        ){
            return true;
        }
        return false;
    }
    collision(object){
        if(this.hitbox.x < object.hitbox.x + object.hitbox.width &&
            this.hitbox.x + this.hitbox.width > object.hitbox.x &&
            this.hitbox.y < object.hitbox.y + object.hitbox.height &&
            this.hitbox.y + this.hitbox.height > object.hitbox.y
        ){
            return true;
        }
        return false
    }
    isBigger(object){
        if(this.hitbox.width*2 + this.hitbox.height*2 > 
            object.hitbox.width*2 + object.hitbox.height*2
        ){
            return true;
        }
        return false;
    }
}