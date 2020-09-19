'use strict';

class Food {
    constructor(game = new Game()) {
        this.game = game;
        this.food = {};
        this.theBiggerOne = null;
        this.randomScore = null;
        this.numFoodAte = 0;
        this.foodImg = new Image();
        this.foodImg.src = "img/food.webp";
    }

    init() {
        this.createFood();
    }

    createFood() {
        if (this.numFoodAte !== 0 &&
            this.numFoodAte % 5 === 0) {
            this.food = {
                x: Math.floor(Math.random() * 16 + 1) * this.game.unit,
                y: Math.floor(Math.random() * 14 + 3) * this.game.unit,
                w: 2 * this.game.unit,
                h: 2 * this.game.unit
            };
            this.theBiggerOne = true;
            this.numFoodAte = 0;
        } else {
            this.food = {
                x: Math.floor(Math.random() * 17 + 1) * this.game.unit,
                y: Math.floor(Math.random() * 15 + 3) * this.game.unit,
                w: this.game.unit,
                h: this.game.unit
            };
            this.theBiggerOne = false;
            this.numFoodAte++;
        }

        if (this.checkRandomFood(this.game.snake.snakeBody)) {
            this.createFood();
        }
    }

    checkRandomFood(head) {
        for (let i = 0, length = head.length; i < length; i++) {
            if (this.foodCollision(head[i])) {
                return true;
            }
        }
        return false;
    }

    foodCollision(head) {
        return (
            head.x === this.food.x && head.y === this.food.y ||
            head.x === this.food.x &&
            head.y + this.game.unit === this.food.y + this.food.h ||
            head.x + this.game.unit === this.food.x + this.food.w &&
            head.y === this.food.y ||
            head.x + this.game.unit === this.food.x + this.food.w &&
            head.y + this.game.unit === this.food.y + this.food.h
        );
    }

    draw() {
        const offContext = this.game.offContext;
        //draw food
        offContext.drawImage(
            this.foodImg,
            this.food.x,
            this.food.y,
            this.food.w,
            this.food.h
        );
    }
}