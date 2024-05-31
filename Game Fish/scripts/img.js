export class Img{
    constructor(spritesheet,paddlePostion,paddleWidth,paddleHeight,scale){
        this.spritesheet = spritesheet;
        this.paddlePostion = paddlePostion;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight; 
        this.scale = scale;
        this.width = this.paddleWidth * this.scale;
        this.height = this.paddleHeight * this.scale;
    }
    draw(ctx,position){
        this.width = this.paddleWidth * this.scale;
        this.height = this.paddleHeight * this.scale;
        ctx.drawImage(
            this.spritesheet,
            this.paddlePostion.x,
            this.paddlePostion.y,
            this.paddleWidth,
            this.paddleHeight,
            position.x - this.width/2,
            position.y - this.height/2,
            this.width,
            this.height
        )
    }

}