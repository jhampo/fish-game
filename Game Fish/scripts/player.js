import {GameObject} from './game-object.js'
import { Img } from './img.js'

export class Player extends GameObject{
    constructor(canvas,spritesheet){
        //canvas,position,speed,direction,image
        let img = new Img(spritesheet,{x:250,y:1024},120,96,0.35)
        super(canvas,{x:200,y:200},1,1,img)
        this.mousePos = {x:0,y:0}
        this.mouseEvent()
        this.death = false;
        this.imgInit = img;
        this.imgDeath = new Img(spritesheet,{x:640,y:568},110,88,0.35);
    } 
    update() {
        if(this.death){
          this.draw();
          this.position.y -= this.speed;
          return;
        }
        this.draw();
        this.move();
        this.collisionCanvas();
    }
    move() {
        this.direction = this.mousePos.x > this.position.x ? 1 : -1;

        let v1 = {
          x: this.mousePos.x - this.position.x,
          y: this.mousePos.y - this.position.y,
        };
        let mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        let vU = {
          x: v1.x / mag,
          y: v1.y / mag,
        };
        let vel = (mag * 8) / 80;
    
        this.position.x += vU.x * (vel);
        this.position.y += vU.y * (vel)
    }
    mouseEvent() {
        document.addEventListener("mousemove", (evt) => {
          let rect = this.canvas.getBoundingClientRect();
          this.mousePos.x = evt.clientX - rect.left;
          this.mousePos.y = evt.clientY - rect.top;
        });
    }
    collisionCanvas(){
      if(this.position.x + this.image.width/2 > this.canvas.width){
        this.position.x = this.canvas.width - this.image.width/2;
      }
      if(this.position.x - this.image.width/2 < 0){
        this.position.x = this.image.width/2;
      }
      if(this.position.y - this.image.height/2 < 0){
        this.position.y = this.image.height/2;
      }
      if(this.position.y+this.image.height/2 > this.canvas.height){
        this.position.y = this.canvas.height - this.image.height/2;
      }
    }
    

}