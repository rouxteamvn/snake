'use strict';

class Menu {
    constructor(game = new Game()) {
        this.game = game;
        this.snakeImg = new Image();
        this.snakeImg.src = "img/snake.webp";
        this.startBtnImg = new Image();
        this.startBtnImg.src = "img/playBtn.webp";
        this.settingBtnImg = new Image();
        this.settingBtnImg.src = "img/setting.webp";

        this.startBtn = {
            x: 3 * this.game.unit,
            y: 12.9 * this.game.unit,
            w: 8 * this.game.unit,
            h: 2.7 * this.game.unit
        }

        this.settingBtn = {
            x: 13 * this.game.unit,
            y: 13.5 * this.game.unit,
            w: 2 * this.game.unit,
            h: 2 * this.game.unit
        }

        this.snakeTheme = {
            x: 5 * this.game.unit,
            y: 4 * this.game.unit,
            w: 9 * this.game.unit,
            h: 8 * this.game.unit
        }
    }

    draw() {
        const offContext = this.game.offContext;

        offContext.drawImage(
            this.snakeImg,
            this.snakeTheme.x,
            this.snakeTheme.y,
            this.snakeTheme.w,
            this.snakeTheme.h
        );

        offContext.drawImage(
            this.startBtnImg,
            this.startBtn.x,
            this.startBtn.y,
            this.startBtn.w,
            this.startBtn.h
        );

        offContext.drawImage(
            this.settingBtnImg,
            this.settingBtn.x,
            this.settingBtn.y,
            this.settingBtn.w,
            this.settingBtn.h
        );
    }
}