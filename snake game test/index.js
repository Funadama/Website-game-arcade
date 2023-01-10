
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const blockSize = 25;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;


let snake = [
  {x: width / 2, y: height / 2}
];


let direction = "right";


let food = {
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height)
};


let score = 0;


function render() {

  console.log("test")
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x * blockSize,
      snake[i].y * blockSize,
      blockSize,
      blockSize
    );
  }


  ctx.fillStyle = "red";
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`Score: ${score}`, 10, 10);
}


function update() {

  let nextPos = {
    x: snake[0].x,
    y: snake[0].y
  };
  switch (direction) {
    case "up":
      nextPos.y--;
      break;
    case "down":
      nextPos.y++;
      break;
    case "left":
      nextPos.x--;
      break;
    case "right":
      nextPos.x++;
      break;
  }

  if (nextPos.x < 0 || nextPos.x >= width || nextPos.y < 0 || nextPos.y >= height || checkCollision(nextPos)) {

    gameOver();
    return;
  }

  if (nextPos.x === food.x && nextPos.y === food.y) {
   
    score++;

   
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
  } else {
  
    snake.pop();
  }


  snake.unshift(nextPos);
}  

function checkCollision(pos) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === pos.x && snake[i].y === pos.y) {
      return true;
    }
  }
  return false;
}



function gameOver() {

 

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log("ded")
 
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`Game over / Score: ${score}`, width / 2 * blockSize, height / 2 * blockSize);
  
  gameOver();
  
}


let gameLoop = setInterval(() => {
  update();
  render();
}, 100);


document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
      case " ": 
      
      snake = [{x: width / 2, y: height / 2}];
      direction = "right";
      score = 0;
      food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
      break;
  }
});