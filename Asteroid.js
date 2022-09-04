class Asteroid{
    constructor(x,y,width,height,asteroidPos){
        this.speed=0.1;
        this.body=Bodies.rectangle(x,y,width,height)
        this.width = width
        this.height=height
        this.asteroidImg = loadImage("./assets/asteroid.png");
        this.asteroidPosition=asteroidPos;
        this.isBroken=false;
        
        World.add(world,this.body)
    }
    remove(index){
        this.asteroidImg=loadImage("./assets/asteroid broken.png");
        setTimeout(()=>{
            Matter.World.remove(world,asteroids[index].body);
            this.isBroken=true;
            delete asteroids[index];
        },1000);
    }
    display(){
            
        var angle=this.body.angle
        var pos=this.body.position;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.asteroidImg, 0, this.asteroidPosition, this.width, this.height);
        pop();
    }


}