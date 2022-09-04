const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, backgroundImg;
var canvas, angle, tower, wall, cannon;
var bombs = [];
var asteroids = [];
var score = 0;
var asteroidImg;
var nuclearbomb;
var isGameOver = false

function preload() {
  backgroundImg = loadImage("./assets/istockphoto-1173451503-612x612.jpg");

  //bombs = loadImage("./assets/nuclear bomb.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  cannon = new Cannon(180, 110, 240, 140, angle);
  nuclearbomb = new NuclearBomb(cannon.x, cannon.y);
}


function draw() {
  background(51);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);
  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();
  for (var i = 0; i < bombs.length; i++) {
    showNuclearBombs(bombs[i], i);
    asteroidCollision(i);
  }
  cannon.display();
  fill("red")
  textSize(20)
  text("Score = " + score, width - 200, 50)
  textAlign(CENTER, CENTER)
  showAsteroids();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    //bombs[bombs.length - 1].shoot();
    nuclearbomb = new NuclearBomb(cannon.x, cannon.y);
    bombs.push(nuclearbomb);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    nuclearbomb.shoot()
    //bombs.push(nuclearbomb);
  }
}

function showNuclearBombs(bomb, i) {
  if (bomb) {
    bomb.display();
  }

}

function showAsteroids() {
  if (asteroids.length > 0) {
    if (
      asteroids[asteroids.length - 1] === undefined ||
      asteroids[asteroids.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -70, 0, -100, 30, -300, -500, -600, -200];
      var position = random(positions);
      console.log(position)
      var asteroid = new Asteroid(width, height - 200, 100, 100, position);

      asteroids.push(asteroid)
    }

    for (var i = 0; i < asteroids.length; i++) {
      if (asteroids[i]) {
        Matter.Body.setVelocity(asteroids[i].body, { x: -1, y: 0 });

        asteroids[i].display();
      }
    }
  } else {
    var asteroid = new Asteroid(width, height - 200, 100, 100, position);
    asteroids.push(asteroid);
  }

}

function asteroidCollision(index) {
  for (var i = 0; i < asteroids.length; i++) {
    if (bombs[index] !== undefined && asteroids[i] !== undefined) {
      var collision = Matter.SAT.collides(bombs[index].body, asteroids[i].body)


      if (collision.collided) {
        asteroids[i].remove(i);
        score = score + 1;
        Matter.World.remove(world, bombs[index].body)
        delete bombs[index]
      }
    }
  }
}
