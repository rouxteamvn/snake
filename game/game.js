'use strict';

class Game {
    constructor() {
        //canvas stuff 
        this.offCanvas = document.getElementById("offCanvas");
        this.offContext = this.offCanvas.getContext("2d");
        this.width = this.offCanvas.width;
        this.height = this.offCanvas.height;

        //wrap on-cavas to div element
        this.div = document.getElementById("div-canvas");
        this.canvas = document.createElement("canvas");
        this.canvas.width = 608;
        this.canvas.height = 608;
        this.div.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.unit = 32;
        this.trackingFps = {
            elapsed: 0,
            then: 0,
            now: 0,
            fpsInterval: 0
        }

        this.mode = null;
        this.requestId = null;

        this.menu = new Menu(this);
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.prize = new Prize(this);

        this.groundImg = new Image();
        this.groundImg.src = "img/ground.webp";
        this.lose = false;

        this.cup = new Image();
        this.cup.src = "img/cup.webp";
        this.restartImg = new Image();
        this.restartImg.src = "img/restart.webp";
        this.restartBtn = {
            x: 7.3 * this.unit,
            y: 14 * this.unit,
            w: 140,
            h: 54
        }
        this.themeAu = new Audio("audio/theme.mp3");
        this.hasPlayed = false;
    }

    init() {
        this.snake.init();
        this.food.init();
    }

    startAnimating(fps) {
        this.trackingFps.fpsInterval = 1000 / fps;
        this.trackingFps.now = Date.now();

        this.play();
    }

    play() {
        this.requestId = requestAnimationFrame(this.play.bind(this));

        this.trackingFps.now = Date.now();
        this.trackingFps.elapsed = this.trackingFps.now - this.trackingFps.then;
        if (this.trackingFps.elapsed > this.trackingFps.fpsInterval) {
            this.trackingFps.then = this.trackingFps.now - (this.trackingFps.elapsed % this.trackingFps.fpsInterval);
            this.themeAu.volume = 0.1;
            this.themeAu.play();
            this.update();
            this.draw();
            this.checkLose(this.requestId);
        }
    }

    checkLose(requestId) {
        if (this.lose) {
            this.themeAu.pause();
            cancelAnimationFrame(requestId);
        }
    }
    update() {
        if (this.hasPlayed) {
            this.snake.update();
            this.prize.update();
        }
    }

    formatString(score) {
        if (score === 0) {
            return `000`;
        }

        const scoreStr = score.toString();
        const numOfDigits = Math.floor(Math.log10(score));
        return numOfDigits === 0 ? `${"0".repeat(2)}${scoreStr}` :
            numOfDigits === 1 ? `${"0".repeat(1)}${scoreStr}` :
            `${"0".repeat(0)}${scoreStr}`;
    }

    draw() {
        // draw ground
        this.offContext.drawImage(this.groundImg, 0, 0);

        if (!this.hasPlayed) {
            this.menu.draw();
        } else {
            if (!this.lose) {
                this.food.draw();
                this.prize.draw();
                this.snake.draw();
            } else {
                this.offContext.drawImage(
                    this.cup,
                    7 * this.unit,
                    7 * this.unit,
                    5 * this.unit,
                    5 * this.unit
                );
                this.offContext.font = "45px Changa One";
                this.offContext.fillStyle = "rgb(0,0,0)";

                // draw game over
                this.offContext.fillText(
                    this.formatString(this.snake.score),
                    8.1 * this.unit,
                    10.5 * this.unit
                );

                this.offContext.font = "32px Changa One";
                this.offContext.fillText(
                    `High Score: ${this.snake.highScore.toString()}`,
                    11 * this.unit,
                    1.5 * this.unit
                )

                this.offContext.fillText(
                    "Ăn nhiều thì phải khát nước",
                    3.9 * this.unit,
                    6.3 * this.unit
                );
                this.offContext.fillText(
                    "Làm tách trà bình tĩnh lại bạn ei! ",
                    3 * this.unit,
                    13 * this.unit
                );

                this.offContext.drawImage(
                    this.restartImg,
                    this.restartBtn.x,
                    this.restartBtn.y,
                    this.restartBtn.w,
                    this.restartBtn.h
                );



            }
        }

        this.offContext.font = "20px Changa One ";
        this.offContext.fillStyle = "rgb(255,255,255)";
        this.offContext.fillText("Nếu có gặp lỗi đừng báo cho dev, nó cọc nó tới nhà nó đánh!", 2 * this.unit, 18.7 * this.unit);
        this.context.drawImage(this.offCanvas, 0, 0);
    }


    getMousePos(canvas, e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    btnClick(btn, e) {
        const mousePos = this.getMousePos(this.canvas, e);
        return (
            mousePos.x >= btn.x &&
            mousePos.x <= btn.x + btn.w &&
            mousePos.y >= btn.y &&
            mousePos.y <= btn.y + btn.h);
    }
}

window.onload = () => {
    const fps = 10;
    let game = new Game();
    game.init();
    game.startAnimating(fps);

    document.addEventListener("click", (e) => {
        if (!game.hasPlayed) {
            if (game.btnClick(game.menu.startBtn, e)) {
                game.hasPlayed = true;
            } else if (game.btnClick(game.menu.settingBtn, e)) {
                game.menu.settingBtn.w = 0;
                setTimeout(() => {
                    game.menu.settingBtn.w = 2 * game.unit;
                }, 300);
            }
        } else {
            if (game.lose) {
                // click restart button
                if (game.btnClick(game.restartBtn, e)) {
                    game.div.removeChild(game.canvas);
                    game = new Game();
                    game.init();
                    game.startAnimating(fps);
                }
            }
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            if (game.lose) {
                game.div.removeChild(game.canvas);
                game = new Game();
                game.init();
                game.startAnimating(fps);
            }
        }

        const move = game.snake.move;
        switch (e.key) {
            case "ArrowLeft":
                if (move !== "right") {
                    game.snake.move = "left";
                }
                break;
            case "ArrowUp":
                if (move !== "down") {
                    game.snake.move = "up";
                }
                break;
            case "ArrowRight":
                if (move !== "left") {
                    game.snake.move = "right";
                }
                break;
            case "ArrowDown":
                if (move !== "up") {
                    game.snake.move = "down";
                }
                break;
            default:
                game.snake.move = "stop";
                break;
        }
    });
}