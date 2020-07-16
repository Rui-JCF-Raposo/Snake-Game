console.log("Snake Game Connected!");

const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");

const box = 32;
const randomXY = () => {
  return {
    x: Math.floor(Math.random() * 17 +1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
  }
}
let direction;

let food = randomXY();
let snake = [];
snake[0] = randomXY();
const groundImg = new Image();
groundImg.src = "./img/ground.png";

const foodImg = new Image();
foodImg.src = "./img/food.png"

const deadAudio = new Audio();
deadAudio.src = "./audio/dead.mp3";

const eatAudio = new Audio();
eatAudio.src = "./audio/eat.mp3";

const downAudio = new Audio();
downAudio.src = "./audio/down.mp3";

const leftAudio = new Audio();
leftAudio.src = "./audio/left.mp3";

const upAudio = new Audio();
upAudio.src = "./audio/up.mp3";

const rightAudio = new Audio();
rightAudio.src = "./audio/right.mp3";

setInterval(function() {
  snakeX = snake[0].x;
  snakeY = snake[0].y;
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.drawImage(groundImg, 0, 0);
  canvasCtx.drawImage(foodImg, food.x, food.y);
  if(direction == "left") {
    snakeX -= box;
  } else if(direction == "up") {
    snakeY -= box;
  } else if(direction == "right") {
    snakeX += box;
  } else if(direction == "down"){
    snakeY += box;
  }

  //Check sanke collision
  for(let i = 1; i < snake.length; i++) {
    if(snakeX == snake[i].x && snakeY == snake[i].y) {
      deadAudio.play();
      alert("GAME OVER");
      window.location.reload();
    }
  }

  //Create new snake's head
  snake.unshift({x: snakeX, y: snakeY});

  //Draw intire sanke
  for(let i = 0; i < snake.length; i++) {
    canvasCtx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  

  if(snakeX == food.x && snakeY == food.y) {
    food = randomXY();
    eatAudio.play();
  } else {
    snake.pop();
  }

  if(
      snakeX < box || snakeX > box * 17 ||
      snakeY < box * 3 || snakeY > box * 18
  ) {
    deadAudio.play();
    alert("GAME OVER");
    window.location.reload();
  }
}, 100)

document.addEventListener("keydown", (e) => {
  //Left
  if(direction != "right" && e.keyCode == 37) {
    direction = "left";
    leftAudio.play();
  }
  //Up
  if(direction != "down" && e.keyCode == 38) {
    direction = "up";
    upAudio.play();
  }
  //Right
  if(direction != "left" && e.keyCode == 39) {
    direction = "right";
    rightAudio.play();
  }
  //Down
  if(direction != "up" && e.keyCode == 40) {
    direction = "down";
    downAudio.play();
  }
});