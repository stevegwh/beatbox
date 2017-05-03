class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.roughness = 1;
        this.blinkCount = 0;
        this.speed = 8;
    }
    draw() {
        strokeWeight(1);
        this.x = constrain(this.x, this.width, width - this.width);
        this.collisionHandler();
        //stroke(255);
        s.scribbleRect(this.x, this.y, this.width, this.height);
    }
    update() {
        if (keyIsDown(LEFT_ARROW))
            this.x -= this.speed;

        if (keyIsDown(RIGHT_ARROW))
            this.x += this.speed;

        this.draw();
    }
    action(k) {
        if (k === UP_ARROW) {
            if (this.y !== height * 0.33 - this.height + 6) {
                this.y -= height * 0.33;
            }
        } else if (k === DOWN_ARROW) {
            if (this.y !== height - this.height) {
                this.y += height * 0.33;
            }
        }
    }
    collisionHandler() {
        if (game.collisionDetected && this.blinkCount < 6) {
            s.roughness = this.roughness * 5;
            game.roughness = this.roughness * 2;
            this.blinkCount++;
        } else {
            s.roughness = this.roughness;
            game.roughness = this.roughness / 4;
            this.blinkCount = 0;
            game.collisionDetected = false;
        }
    }
}
