// Set up the canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Set the size of the canvas
const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

// Set the initial position of the snake
let snake = [
  {x: width / 2, y: height / 2}
];

// Set the initial direction of the snake
let direction = "right";

// Set the initial position of the food
let food = {
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height)
};

// Set the initial score
let score = 0;

// Render the game
function render() {
  // Clear the canvas
  console.log("test")
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x * blockSize,
      snake[i].y * blockSize,
      blockSize,
      blockSize
    );
  }

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

  // Update the score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update the game state
function update() {
  // Get the next position of the snake based on the direction
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

  // Check if the snake has collided with the wall or itself
  if (nextPos.x < 0 || nextPos.x >= width || nextPos.y < 0 || nextPos.y >= height || checkCollision(nextPos)) {
    // Game over
    gameOver();
    return;
  }

  // Check if the snake has eaten the food
  if (nextPos.x === food.x && nextPos.y === food.y) {
    // Increase the score
    score++;

    // Generate new food
    food = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
  } else {
    // Remove the last element of the snake
    snake.pop();
  }

  // Add the new position to the front of the snake
  snake.unshift(nextPos);
}  
  // Check if the snake has collided with itself
function checkCollision(pos) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === pos.x && snake[i].y === pos.y) {
      return true;
    }
  }
  return false;
}


// Game over function
function gameOver() {

 
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log("ded")
  // Show the game over message
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`Game over / Score: ${score}`, width / 2 * blockSize, height / 2 * blockSize);
  
  gameOver();
  
}

// Set up the game loop
let gameLoop = setInterval(() => {
  update();
  render();
}, 100);

// Set up the arrow keys for controlling the snake
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
      case " ": // space bar
      // Reset the game
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