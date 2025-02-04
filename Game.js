// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const unitSize = 25;
let snake = [{ x: 0, y: 0 }];
let food = getRandomFoodPosition();
let direction = 'RIGHT';
let gameRunning = true;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (!gameRunning) return;
    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        if (isGameOver()) {
            gameRunning = false;
            alert('Game Over');
        } else {
            gameLoop();
        }
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, unitSize, unitSize);
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'UP':
            head.y -= unitSize;
            break;
        case 'DOWN':
            head.y += unitSize;
            break;
        case 'LEFT':
            head.x -= unitSize;
            break;
        case 'RIGHT':
            head.x += unitSize;
            break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (key === 38 && direction !== 'DOWN') direction = 'UP';
    if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function getRandomFoodPosition() {
    const foodX = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
    const foodY = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
    return { x: foodX, y: foodY };
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

gameLoop();
