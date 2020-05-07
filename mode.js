function death() {
    if (
        head.x < 2 ||
        head.x > 27 ||
        head.y < 5 ||
        head.y > 27 ||
        checkCollision(head.x, head.y, snake)
    ) {
        clearInterval(draw);
        showLose();
        return;
    }
}

function noDeath() {
    if (head.x < 3) {
        head.x = 28;
    } else if (head.x > 27) {
        head.x = 2;
    } else if (head.y <= 5) {
        head.y = 28;
    } else if (head.y >= 28) {
        head.y = 5;
    } else if (checkCollision(head.x, head.y, snake)) {
        clearInterval(draw);
        showLose();
        return;
    }
}

function checkCollision(x, y, array) {
    for (let i = length; i < array.length; i++) {
        if (x == array[i].x && y == array[i].y) {
            return true;
        }
    }
    return false;
}


function showLose() {
    context.drawImage(ground, 0, 0);
    context.font = '40px Changa one';
    context.fillText("Thua rồi bạn ơi, khóc lóc cái lol!", 40, height / 2);
    context.fillText("Score: " + score, 230, height / 2 + 85);


    context.font = '25px Changa one';
    context.strokeRect(250, height / 2 + 115, 100, 30);
    context.fillText("Chơi lại", 258, height / 2 + 140);
}