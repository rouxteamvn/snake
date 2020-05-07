"use strict";

//canvas stuff
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

// snake stuff
const unit = 20;
let food;
let snake;
let length;
let score;
let head;
let move;
const apple = document.getElementById("apple");
const ground = document.getElementById("ground");

function start() {
    move = "stop";
    score = 0;
    createSnake();
    createFood();
}

start();

function createSnake() {
    length = 3;
    snake = [];
    for (let i = 0; i < length; i++) {
        snake.push({ x: 18 + i, y: 10 });
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * 15 + 2),
        y: Math.floor(Math.random() * 17 + 5)
    };

    checkFoodinSnake(food.x, food.y, snake)
}

function checkFoodinSnake(x, y, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (x == arr.x && y == arr.y)
            createFood();
    }
}

function game() {
    //ground
    context.drawImage(ground, 0, 0)
        // draw food
    context.drawImage(apple, food.x * unit, food.y * unit, unit, unit);

    //draw snake
    head = {
        x: snake[0].x,
        y: snake[0].y,
    };

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "orange";
        context.fillRect(snake[i].x * unit, snake[i].y * unit, unit, unit);
        context.strokeStyle = "red";
        context.strokeRect(snake[i].x * unit, snake[i].y * unit, unit, unit);
    }

    //death();
    noDeath();
    moveSnake();
    eatFood();
    showScore();
}

// get keydown
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37 && move != "right") {
        move = "left";
    } else if (e.keyCode == 38 && move != "down") {
        move = "up";
    } else if (e.keyCode == 39 && move != "left") {
        move = "right";
    } else if (e.keyCode == 40 && move != "up") {
        move = "down";
    }
});

function moveSnake() {
    switch (move) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
        default:
            break;
    }
}

function eatFood() {
    if (head.x == food.x && head.y == food.y) {
        score += 10;
        createFood();
    } else {
        snake.pop();
    }

    let newHead = {
        x: head.x,
        y: head.y,
    };

    snake.unshift(newHead);
}

function showScore() {
    context.font = "45px Changa one";
    context.fillText(score, 70, 1.6 * 32);
}

let draw = setInterval(() => {
    game();
}, 70);