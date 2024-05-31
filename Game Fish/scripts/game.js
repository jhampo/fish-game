import { Bubble } from "./Bubble.js";
import { Enemy } from "./enemy.js";
import {Img} from "./img.js"
import {Player} from './player.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const spritesheet = document.getElementById("spritesheet");
const btnPlay = document.querySelector(".play");
const spanSize = document.querySelector(".size");

canvas.width = 720;
canvas.height = 480;
let backgroundImg;
let play = false;
let size = 2;

const player = new Player(canvas,spritesheet)
const enemys = [];
const bubbles = [];

function createBubbles(){
    let numRandom = player.randomNumber(1,200,true);
    if(numRandom==2){
        let position = {
            x:player.randomNumber(0,canvas.width),
            y:canvas.height
        }
        let scale = player.randomNumber(0.2,0.5,false);
        let bubble = new Bubble(canvas,spritesheet,position,scale,1);
        bubble.opacity = player.randomNumber(0.4,0.9,false);
        bubbles.push(bubble)
    }
}
function createEnemys(){
    let num = player.randomNumber(1,100,true);
    if(num==1){
        let enemy = new Enemy(canvas,spritesheet);
        enemys.push(enemy);
        setTimeout(()=>{
            enemy.death = true;
        },3000);
    }
}
function updateObjects(){
    enemys.forEach((enemy,i)=>{
        enemy.update();
        enemy.createBubbles(bubbles);
        if(enemy.isOutCanvas()&&enemy.death){
            setTimeout(()=>{
                enemys.splice(i,1);
            }) 
        }
    });
    bubbles.forEach((bubble,i)=>{
        bubble.update();
        if(bubble.isOutCanvas()){
            setTimeout(()=>{
                bubbles.splice(i,1);
            },0);
        }
    });

}
function death(){
    player.death = true;
    player.image = player.imgDeath;
    setTimeout(()=>{
        btnPlay.style.display = "flex";
        play = false;
    },2000);
};
function collisions(){
    enemys.forEach((enemy,i)=>{
        if(enemy.collision(player)){
            if(enemy.type == 6){
                death();
            }else if(player.isBigger(enemy)){
                setTimeout(()=>{
                    enemys.splice(i,1);
                    player.image.scale += 0.02;
                    player.imgDeath.scale = player.image.scale;
                    size += 1.5;
                    spanSize.innerHTML = size;
                },0)
            }else{
                death();
            }
        }
    });
}
function createBackground(){
    let image = new Image();
    image.src = "/map.png";
    image.onload = ()=>{
        backgroundImg = image;
    }
}
function drawBackground(){
    if (!backgroundImg) return;
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
}
createBackground();
btnPlay.addEventListener("click",()=>{
    init();
})
function init(){    
    player.position = {x:200,y:200};
    player.death = false;
    player.imgInit.scale = 0.35;
    player.imgDeath.scale = 0.35;
    player.image = player.imgInit;
    play = true;
    btnPlay.style.display = "none";
    enemys.length = 0;  
    size = 2;
    spanSize.innerHTML = size;
}
function update(){
    drawBackground();
    createEnemys();
    updateObjects();
    collisions();
    createBubbles();
    
    if(play){
        player.update();
    }
 
    requestAnimationFrame(update);
}
update();
