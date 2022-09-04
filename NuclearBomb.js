class NuclearBomb {
    constructor(x, y) {
      var options = {
        isStatic: true
      };
      this.r = 70;
      this.speed = 0.05;
      this.body = Bodies.circle(x, y, this.r, options);
      this.image = loadImage("./assets/nuclear bomb.png");
     // this.animation = [this.image];
      World.add(world, this.body);
    }
  
   
  
    shoot() {
      var newAngle = cannon.angle - 28;
      newAngle = newAngle *(3.14/180)
      var velocity = p5.Vector.fromAngle(newAngle);
      velocity.mult(0.5);
      Matter.Body.setStatic(this.body, false);
      Matter.Body.setVelocity(this.body, {
        x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
    }

  remove(i){
    setTimeout(()=>{
      Matter.World.remove(world,this.body);
      delete bombs[i];
    }, 1000);
  }
    display() {
      var pos = this.body.position
        push()
        imageMode(CENTER)
        image(this.image, pos.x, pos.y,this.r, this.r)
        pop()

    }

   
  }
  