let s, sound, player, game, timemap, hit;

var stop = false;

var preload = () => {
    sound = loadSound("music.mp3");
    hit = loadSound("hit.wav");
}

var setup = () => {

    const canvas = createCanvas(1000,600);
    canvas.parent("sketch");
    s = new Scribble();
    s.roughness = 0.75
    frameRate(60);
    hit.setVolume(0.75)
    timemap = new Timemap();
    game = new Game();
    player = new Player(width/4, height-50, 50, 50);

    sound.play();
    //sound.jump(230);
}

var draw = () => {
    background(0);
    if(!stop) {
        game.update();
    }

}

var keyPressed = () => {
    if(keyCode === 32) {
        console.log(sound.currentTime());
    }
    player.action(keyCode);
}
