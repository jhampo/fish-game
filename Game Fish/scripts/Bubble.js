import { GameObject } from "./game-object.js";
import {Img} from "./img.js"

export class Bubble extends GameObject{
    constructor(canvas,spritesheet,position,scale,type){
        let img = new Img(spritesheet,{x:1075,y:657},48,48,scale);
        if(type==2){
            img = new Img(spritesheet,{x:152,y:1096},24,24,scale)
        }
        super(canvas,position,1,1,img);
    }
    update(){
        this.draw();
        this.position.y -= this.speed;
    }
 
}