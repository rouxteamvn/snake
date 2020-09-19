'use strict';

class Prize {
    constructor(game = new Game()) {
        this.game = game;
        this.theBiggerOneArr = [];
    }

    createBiggerOne() {
        if (this.game.prize.theBiggerOneArr.length === 0) {
            this.game.prize.theBiggerOneArr = [{
                x: 2 * this.game.unit,
                y: 4 * this.game.unit,
                w: 2 * this.game.unit,
                h: 2 * this.game.unit
            }, {
                x: 15 * this.game.unit,
                y: 4 * this.game.unit,
                w: 2 * this.game.unit,
                h: 2 * this.game.unit
            }, {
                x: 2 * this.game.unit,
                y: 15 * this.game.unit,
                w: 2 * this.game.unit,
                h: 2 * this.game.unit
            }, {
                x: 15 * this.game.unit,
                y: 15 * this.game.unit,
                w: 2 * this.game.unit,
                h: 2 * this.game.unit
            }];
        }

    }

    checkRandomFood(head, food) {
        for (let i = 0, length = head.length; i < length; i++) {
            if (this.foodCollision(head[i], food)) {
                return true;
            }
        }
        return false;
    }

    foodCollision(head, food) {
        return (
            head.x === food.x && head.y === food.y ||
            head.x === food.x &&
            head.y + this.game.unit === food.y + food.h ||
            head.x + this.game.unit === food.x + food.w &&
            head.y === food.y ||
            head.x + this.game.unit === food.x + food.w &&
            head.y + this.game.unit === food.y + food.h
        );
    }

    update() {
        switch (this.game.food.randomScore) {
            case 0:
                this.game.snake.mode = "classic";
                break;
            case 1:
                this.theBiggerOneArr.forEach((food, i) => {
                    if (this.foodCollision(this.game.snake.head, food)) {
                        this.game.snake.eatAu.play();
                        this.game.snake.score += Math.floor(Math.random() * 6);
                        this.theBiggerOneArr.splice(i, 1);
                        i--;
                    }
                });
                break;
            case 2:
                // no collision
                this.game.snake.mode = "cant eat urself";
                break;

            default:
                this.game.snake.mode = "modern";
                break;
        }
    }

    draw() {
        const offContext = this.game.offContext;
        offContext.font = "32px Changa One ";
        offContext.fillStyle = "rgb(255,0,0)";
        switch (this.game.food.randomScore) {
            case 0:
                offContext.fillText("Classic mode", 11.2 * this.game.unit, 1.5 * this.game.unit);
                break;
            case 1:
                offContext.fillText("The more, the less", 10.2 * this.game.unit, 1.5 * this.game.unit);
                this.theBiggerOneArr.forEach((food) => {
                    this.game.offContext.drawImage(
                        this.game.food.foodImg,
                        food.x,
                        food.y,
                        food.w,
                        food.h
                    );
                });
                break;
            case 2:
                offContext.fillText("Cant eat urself", 11 * this.game.unit, 1.5 * this.game.unit);
                break;
        }
    }
}