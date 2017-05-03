class Timemap {
    constructor() {}
    draw(game) {
        stroke(255);
        if (sound.currentTime() > 41) {
            game.speed = 1.6;
            background(255);
            stroke(0)
        }
        if (sound.currentTime() > 51) {
            game.speed = 1;
            background(0);
            stroke(255)
        }

        if (sound.currentTime() > 55) {
            game.speed = 1.6;
            background(255);
            stroke(0);
        }

        if (sound.currentTime() > 65) {
            game.speed = 1;
            background(0);
            stroke(255)
        }

        if (sound.currentTime() > 69) {
            game.speed = 1.6;
            background(255);
            stroke(0);
        }

        if (sound.currentTime() > 78) {
            game.speed = 1;
            background(0);
            stroke(255)
        }

        if (sound.currentTime() > 82) {
            game.speed = 1.6;
            background(255);
            stroke(0);
        }

        if (sound.currentTime() > 91) {
            game.speed = 1;
            background(0);
            stroke(255);
        }

        if (sound.currentTime() > 119) {
            game.speed = 1.6;
            background(255);
            stroke(0);
        }

        if (sound.currentTime() > 172) {
            game.speed = 1.4;
            background(0);
            stroke(255);
        }

        if (sound.currentTime() > 242) {
            stop = true;
        }

    }

}
