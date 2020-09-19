'use strict';

class Snake {
    constructor(game = new Game()) {
        this.game = game;
        this.head = this.newHead = null;
        this.score = 0;
        this.move = null;
        this.highScore = localStorage.getItem("highScore") || 0;
        this.snakeBody = [{
            x: 9 * this.game.unit,
            y: 10 * this.game.unit
        }, {
            x: 8 * this.game.unit,
            y: 10 * this.game.unit
        }];

        this.mode = "modern";
        this.eatAu = new Audio("audio/eat.mp3");
        this.deadAu = new Audio("audio/dead.mp3");
    }

    init() {
        this.move = "stop";
    }


    direction() {
        switch (this.move) {
            case "up":
                this.head.y -= this.game.unit;
                break;
            case "down":
                this.head.y += this.game.unit;
                break;
            case "left":
                this.head.x -= this.game.unit;
                break;
            case "right":
                this.head.x += this.game.unit;
                break;
            case "stop":
                break;
        }
    }

    update() {
        this.head = {
            x: this.snakeBody[0].x,
            y: this.snakeBody[0].y
        };

        if (this.move != "stop") {
            this.direction();
            if (this.game.food.foodCollision(this.head)) {
                this.eatAu.play();
                if (!this.game.food.theBiggerOne) {
                    this.score++;
                } else {
                    this.game.food.randomScore = Math.floor(Math.random() * 6);
                    this.score += this.game.food.randomScore;
                    this.game.prize.createBiggerOne();
                }
                this.highScore = Math.max(this.highScore, this.score);
                localStorage.setItem("highScore", this.highScore);
                this.game.food.createFood();
            } else {
                this.snakeBody.pop();
            }

            if (this.mode.includes("modern")) {
                this.death();
                this.checkCollision();
            } else if (this.mode.includes("cant eat urself")) {
                this.death();
            } else {
                this.noDeath();
            }
            this.snakeBody.unshift(this.head);
        }

    }

    death() {
        if (this.head.x < this.game.unit ||
            this.head.x > 17 * this.game.unit ||
            this.head.y < 3 * this.game.unit ||
            this.head.y > 17 * this.game.unit) {
            this.deadAu.play();
            this.game.lose = true;
        };
    }

    noDeath() {
        if (this.head.x < this.game.unit) {
            this.head.x = 17 * this.game.unit;
        } else if (this.head.x > 17 * this.game.unit) {
            this.head.x = this.game.unit;
        } else if (this.head.y < 3 * this.game.unit) {
            this.head.y = 17 * this.game.unit;
        } else if (this.head.y > 17 * this.game.unit) {
            this.head.y = 3 * this.game.unit;
        }

        this.checkCollision();
    }

    checkCollision() {
        for (let i = 1, length = this.snakeBody.length; i < length; i++) {
            if (this.head.x === this.snakeBody[i].x &&
                this.head.y === this.snakeBody[i].y) {
                this.deadAu.play();
                this.game.lose = true;
                break;
            }
        }
    }

    draw() {
        const offContext = this.game.offContext;
        //draw snake
        this.snakeBody.forEach((head, i) => {
            if (this.mode.includes("modern")) {
                offContext.fillStyle = (i == 0) ? "rgb(255,165,0)" : "rgb(255,165,0)";
                offContext.strokeStyle = "rgb(0,0,0)";
            } else if (this.mode.includes("cant eat urself")) {
                offContext.fillStyle = (i == 0) ? "rgb(255,255,0)" : "rgb(255,192,50)";
                offContext.strokeStyle = "rgb(255,0,50)";
            } else {
                offContext.fillStyle = (i == 0) ? "rgb(50,205,50)" : "rgb(137,209,202)";
                offContext.strokeStyle = "rgb(47,86,233)";
            }
            offContext.fillRect(head.x, head.y, this.game.unit, this.game.unit);
            offContext.strokeRect(head.x, head.y, this.game.unit, this.game.unit);
        });

        // score
        offContext.fillStyle = "rgb(255,255,255)";
        offContext.font = "45px Changa One";
        offContext.fillText(this.score, 2.6 * this.game.unit, 1.7 * this.game.unit);
    }
}