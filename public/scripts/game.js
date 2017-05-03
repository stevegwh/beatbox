class Game {
    constructor() {
        this.score = 0;
        this.heights = [0.33, 0.66, 1];
        this.offset = 55; // how far the square sits from the line
        this.obstacles = [];
        this.obstacles2 = [];
        this.speed = 1; //used to multiply the speed of the game
        this.roughness = 0.25;
        this.collisionDetected = false;
    }
    update() {
        timemap.draw(this);
        this.drawLines();
        this.updateBlocks();
        this.decidePattern();
        player.update();
        this.collisionDetection();
    }
    decidePattern() {
        if (this.obstacles.length === 0) {
            let nextPattern;
            let randNum = random(0, 5);
            if (randNum > 1 && randNum < 2) {
                nextPattern = "alternator";
            } else if (randNum < 1) {
                nextPattern = "sineWave";
            } else if (randNum > 2 && randNum < 3) {
                nextPattern = "frogger";
            } else if(randNum > 3 && randNum < 4){
                nextPattern = "pasodoble";
            } else if(randNum > 4 && randNum < 5){
                nextPattern = "boomerang";
            }
            //nextPattern = "boomerang";
            this.obstacles = this.generateObstacles([], nextPattern);

        }
    }
    updateBlocks() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].direction === "left") {
                if (this.obstacles[i].x > -(width / 5)) {
                    this.obstacles[i].update()
                } else {
                    this.obstacles.splice(i, 1);
                }
            } else if (this.obstacles[i].direction === "right") {
                if (this.obstacles[i].x < width + (width / 5)) {
                    this.obstacles[i].update()
                } else {
                    this.obstacles.splice(i, 1);
                }
            }
        }
    }
    drawLines() {
        strokeWeight(1);
        s.roughness = this.roughness;
        s.scribbleLine(0, height * 0.33, width, height * 0.33);
        s.scribbleLine(0, height * 0.66, width, height * 0.66);
        s.scribbleLine(0, height, width, height);
    }
    generateObstacles(arr, pattern) {
        switch (pattern) {
            case "alternator":
                let alternator = new Alternator();
                alternator.generateArray(this, arr);
                break;
            case "sineWave":
                let sineWave = new Sinewave();
                sineWave.generateArray(this, arr);
                break;
            case "frogger":
                let frogger = new Frogger();
                frogger.generateArray(this, arr);
                break;
            case "pasodoble":
                let pasodoble = new Pasodoble();
                pasodoble.generateArray(this, arr);
                break;
            case "boomerang":
                let boomerang = new Boomerang();
                boomerang.generateArray(this, arr);
                break;
            case "medusa":
                let medusa = new Medusa();
                medusa.generateArray(this, arr);
                break;
            default:
                console.log("error");
        }

        return arr;
    }
    collisionDetection() {
        for (let i = 0; i < this.obstacles.length; i++) {
            let d = dist(player.x, player.y, this.obstacles[i].x, this.obstacles[i].y);
            if (d < player.width / 2 + this.obstacles[i].width / 2 || d < player.height / 2 + this.obstacles[i].height / 2) {
                if(!hit.isPlaying())
                    hit.play()
                this.collisionDetected = true;
                this.obstacles[i].roughness = 5;
            } else {
                this.obstacles[i].roughness = 1;
            }
        }
    }
}
