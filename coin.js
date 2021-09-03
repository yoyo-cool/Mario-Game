class coin{
    constructor(posX) {
     
        this.rx = posX; //setting the x posing where wall will be created  
        this.ry = height-random([600,400,200]);   //setting y position where wall will be created 
        this.spt=createSprite(this.rx, this.ry); //using rx,ry
        this.spt.addAnimation("coin",coinImg);
        this.spt.scale=0.009;
      
      }
    

}