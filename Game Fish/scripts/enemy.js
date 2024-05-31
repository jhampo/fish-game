import { Bubble } from "./Bubble.js";
import { GameObject } from "./game-object.js";
import { Img } from "./img.js";

export class Enemy extends GameObject{
    constructor(canvas,spritesheet){
        super(canvas,{x:200,y:300},1,1,null)
        this.spritesheet = spritesheet;
        this.type = this.randomNumber(1,7,true);
        this.angle = 0;
        this.death = false;
        this.create();
        this.generatePosition();
    }
    create(){
        switch(this.type){
            case 1:
                this.image = new Img(this.spritesheet,{x:640,y:0},116,84,0.6);
                break;
            case 2:
                this.image = new Img(this.spritesheet,{x:852,y:262},86,54,0.5);
                break;
            case 3:
                this.image = new Img(this.spritesheet,{x:128,y:1024},122,72,0.3)
                break;
            case 4:
                this.image = new Img(this.spritesheet,{x:630,y:1024},116,66,0.7);
                break;
            case 5:
                this.image = new Img(this.spritesheet,{x:640,y:164},114,120,0.7);
                break;
            case 6:
                this.image = new Img(this.spritesheet,{x:512,y:1050},118,70,0.7);
                break;
            case 7:
                this.image = new Img(this.spritesheet,{x:128,y:1024},122,72,0.3)
                break;
        }
    }
    createBubbles(bubbles){
        let numRandom = this.randomNumber(1,500,true);
        let xOffset = (this.direction==1) ? this.image.width/2: -this.image.width/2;
        if(numRandom==1){
            let count = this.randomNumber(1,4,true);
            for(let i= 0;i < count;i++){
                let scale = this.randomNumber(0.2,0.4,false);
                let position = {
                    x:this.position.x + xOffset,
                    y:this.position.y
                }
                let bubble = new Bubble(this.canvas,this.spritesheet,position,scale,2);
                bubble.speed = this.randomNumber(1,2,false);
                bubble.opacity = this.randomNumber(0.2,0.8,false);
                bubbles.push(bubble)
            }
        }
    }
    update(){
        this.draw();
        this.position.x += Math.cos(this.angle) * this.speed;
        this.position.y += Math.sin(this.angle) * this.speed;
        this.changeDirection();
    }
    generatePosition(){
        let numRandom = this.randomNumber(1,2,true);
        let x,y;
        if(numRandom==1){
            x = this.canvas.width + this.image.width;
            y = this.randomNumber(
                this.image.height,
                this.canvas.height-this.image.height,
                true
            );
            this.angle = this.randomNumber(170,190,true) * (Math.PI/180);
            this.direction = -1;
        }
        else if(numRandom==2){
            x = -this.image.width;
            y = this.randomNumber(
                this.image.height,
                this.canvas.height-this.image.height,
                true
            );
            this.angle = this.randomNumber(-10,10,true) * (Math.PI/180);
            this.direction = 1;
        }
        this.position = {x:x,y:y}
    }
    changeDirection(){
        let numRandom = this.randomNumber(1,1000,true);
        if(numRandom==1){
            let angleRandom = this.randomNumber(1,360,true);
            this.angle = angleRandom * (Math.PI/180);
            this.direction = angleRandom > 90 && angleRandom <= 270 ? -1 : 1;
            this.speed = this.randomNumber(1,2,false);
        }
    }
}