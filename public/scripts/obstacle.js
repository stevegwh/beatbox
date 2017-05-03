class Obstacle {
    constructor(x, y, direction, speed) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 100;
        this.roughness = 1;
        this.direction = direction;
        this.speed = speed || 9;
    }
    draw() {
        strokeWeight(2);
        rectMode(CENTER)
        rect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.move();
    }
    move() {
        this.direction === "left" ? this.x -= (this.speed * game.speed) : this.x += (this.speed * game.speed);
    }
}

class MedusaObstacle extends Obstacle {
    constructor(x, y, direction, speed) {
        super(x, y, direction, speed);
        this.up = false;
        this.count = 0;
        this.velocity = 10;
    }
    move() {
        this.direction === "left" ? this.x -= this.speed : this.x += this.speed;
        if (this.y >= height - this.width || this.y <= this.width) {
            this.velocity *= -1;
        }
        if (this.x >= 0 && this.x <= width)
            this.y -= this.velocity;
    }

    draw() {
        strokeWeight(2);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.width, this.width);
    }
}

class BoomerangObstacle extends Obstacle {
    constructor(x, y, direction, speed) {
        super(x, y, direction, speed)
        this.enteredScreen = false;
    }
    move() {

        this.direction === "left" ? this.x -= this.speed : this.x += this.speed;

        /*///////////////////////////////////////////////////////////////////////
        //If the object has entered the screen then flag it.
        //Once the object has left the screen (by more than 300px) then change
        //its direction prop so it can be spliced by Game's method
        ///////////////////////////////////////////////////////////////////////*/

        if (this.x >= 0 && this.x <= width && !this.enteredScreen) {
            this.enteredScreen = true;
        } else {
            this.enteredScreen = false;
            if(this.x > width + 300 || this.x < -300)
                this.direction === "left" ? this.direction = "right" : this.direction = "left";
        }

        ///////////////////////////////////////////////////////////////////////////

        if (this.enteredScreen) {
            if (this.x + this.width >= width && this.direction === "right") {
                this.speed *= -1;
            } else if (this.x - this.width <= 0 && this.direction === "left") {
                this.speed *= -1;
            }
        }

    }

    draw() {
        strokeWeight(2);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.width, 20);
    }
}
