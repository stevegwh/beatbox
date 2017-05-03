class Pattern {
    constructor() {
        this.direction = this.getDirection();
    }
    getDirection() {
        return Math.floor((Math.random() * 4) + 1) > 2 ? "right" : "left";
    }
}

class Alternator extends Pattern {
    constructor() {
        super();
    }
    generateArray(game, arr) {
        let pattern, spareRow;
        random(0, 2) > 1 ? (pattern = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], spareRow = 2) :
            (pattern = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1], spareRow = 0);

        for (let i = 0, length = pattern.length; i < length; i++) {
            if (this.direction === "left") {
                arr.push(new Obstacle(width + i * 250, height * game.heights[pattern[i]] - game.offset, this.direction));
                arr.push(new Obstacle(width + i * 250, height * game.heights[spareRow] - game.offset, this.direction));
            } else {
                arr.push(new Obstacle(0 - i * 250, height * game.heights[pattern[i]] - game.offset, this.direction));
                arr.push(new Obstacle(0 - i * 250, height * game.heights[spareRow] - game.offset, this.direction));
            }

        }

        return arr;
    }
}

class Sinewave extends Pattern {
    constructor() {
        super();
    }
    generateArray(game, arr) {
        let pattern;
        random(0, 2) > 1 ? pattern = [0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0] : pattern = [2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2];
        for (let i = 0, length = pattern.length; i < length; i++) {
            let pattern1, pattern2;
            if (pattern[i] === 1) {
                pattern1 = 0;
                pattern2 = 2;
            } else if (pattern[i] === 0) {
                pattern1 = 1;
                pattern2 = 2;
            } else if (pattern[i] === 2) {
                pattern1 = 1;
                pattern2 = 0
            }
            if (this.direction === "left") {
                arr.push(new Obstacle(width + i * 250, height * game.heights[pattern1] - game.offset, this.direction));
                arr.push(new Obstacle(width + i * 250, height * game.heights[pattern2] - game.offset, this.direction));
            } else {
                arr.push(new Obstacle(0 - i * 250, height * game.heights[pattern1] - game.offset, this.direction));
                arr.push(new Obstacle(0 - i * 250, height * game.heights[pattern2] - game.offset, this.direction));
            }
        }

        return arr;
    }
}

class Frogger extends Pattern {
    constructor() {
        super();
        this.direction = "left";
        this.speed = 5;
    }
    generateArray(game, arr) {
        for (let i = 0; i < 4; i++) {
            arr.push(new Obstacle((width + i * 500) + 250, height * game.heights[0] - game.offset, this.direction, this.speed));
            arr.push(new Obstacle(width + i * 500, height * game.heights[2] - game.offset, this.direction, this.speed));
        }

        for (let i = 1; i < 7; i++) {
            arr.push(new Obstacle(width + i * 750, height * game.heights[1] - game.offset, this.direction, this.speed * 2.5));
        }

        return arr;
    }
}

class Pasodoble extends Pattern {
    constructor() {
        super();
        this.direction = "left";
    }
    generateArray(game, arr) {
        let pattern = [1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 1, 1, 0, 1];
        for (let i = 0, length = pattern.length; i < length; i++) {
            arr.push(new Obstacle(width + i * 200, height * game.heights[pattern[i]] - game.offset, this.direction, 9));
        }

        let medusa = new Medusa
        let medusaArray = medusa.generateArray(game, [], this.direction);
        medusaArray.forEach((ele) => {arr.push(ele)});

        return arr;
    }
}

class Medusa extends Pattern {
    constructor() {
        super();
    }
    generateArray(game, arr, direction) {
        direction === "left" ? direction = "right" : direction = "left";
        for (let i = 0; i < 10; i++) {
            if(direction === "left") {
                arr.push(new MedusaObstacle(width + i * 200, height * game.heights[1] - game.offset, direction, 6));
            } else {
                arr.push(new MedusaObstacle(0 - i * 200, height * game.heights[1] - game.offset, direction, 6));
            }

        }
        return arr;
    }
}

class Boomerang extends Pattern {
    constructor() {
        super();
        //this.direction = "left";
    }
    generateArray(game, arr) {
        arr.push(new BoomerangObstacle(width + 20, height * game.heights[0] - game.offset, "left", 6));
        arr.push(new BoomerangObstacle(width + 20, height * game.heights[2] - game.offset, "left", 6));
        arr.push(new BoomerangObstacle(0 - 20, height * game.heights[1] - game.offset, "right", 6));

        let medusa = new Medusa
        let medusaArray = medusa.generateArray(game, [], this.direction);
        medusaArray.forEach((ele) => {arr.push(ele)});


        return arr;
    }
}

/* Scanner class idea
class Boomerang extends Pattern {
    constructor() {
        super();
        //this.direction = "left";
    }
    generateArray(game, arr) {
        arr.push(new BoomerangObstacle(width + 20, height * game.heights[0] - game.offset, "left", 6));
        arr.push(new BoomerangObstacle(width + 20, height * game.heights[2] - game.offset, "left", 6));
        arr.push(new BoomerangObstacle(0 - 20, height * game.heights[1] - game.offset, "right", 6));
        arr.push(new BoomerangObstacle(0 - 80, height * game.heights[1] - game.offset, "right", 6));

        return arr;
    }
} */
