
var Enemy = function(speed,x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    const resetBugPosition = -100;

    if(this.x > 550){
        this.x = resetBugPosition;
        this.speed = randomSpeed();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
};

var enemyOne = new Enemy(randomSpeed(), -100, 220);
var enemyTwo = new Enemy(randomSpeed(), -250, 140);
var enemyThree = new Enemy(randomSpeed(), -300, 55);
var enemyFour = new Enemy(randomSpeed(), 100, 140);
var allEnemies = [];
allEnemies.push(enemyOne,enemyTwo,enemyThree,enemyFour);

var player = new Player(200,300);

player.update = function(dt) {
    if (this.y === -20){
        flashGreen();
        setTimeout(function(){ flasher.classList.remove("flash-green"); }, 300);
        win();
        resetGame();
    }
    this.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// moves 100 pixels left or right and 80
player.handleInput = function(move){
    if(move === "left" && this.x > 0 ){
        this.x -= 100;
    }
    if(move === "right" && this.x < 400){
        this.x += 100;
    }
    if(move === "up" && this.y > 0){
        this.y -= 80;
    }
    if(move === "down" && this.y < 320){
        this.y += 80;
    }
};

// checks if player collides with enemies
Player.prototype.checkCollisions = function() {
    for(i = 0; i < allEnemies.length; i++)
        if (this.x + this.width > allEnemies[i].x &&
            this.x < allEnemies[i].x + allEnemies[i].width  &&
            this.height + this.y > allEnemies[i].y &&
            this.y < allEnemies[i].y + allEnemies[i].height){

            resetGame();
            flashRed();
            setTimeout(function(){ flasher.classList.remove("flash-red"); }, 500);
        }
};

function randomSpeed() {
    return Math.floor(Math.random()*(300-150+1)+150);
}

const flasher = document.querySelector(".bg");
const winText = document.querySelector(".win-text");

function flashRed(){
    flasher.classList.add("flash-red");
}

function flashGreen(){
    flasher.classList.add("flash-green");
}
function win(){
    winText.classList.add("visible");
}
function removeWin(){
    winText.classList.remove("visible");
}

// reset positions for the player and all enemies
function resetGame(){
    player.x = 200;
    player.y = 300;
    enemyOne.x = -100;
    enemyOne.y = 220;
    enemyTwo.x = -200;
    enemyTwo.y = 140;
    enemyThree.x = -300;
    enemyThree.y = 55;
    enemyFour.x = 100;
    enemyFour.y = 140;
    speed = randomSpeed();
    setTimeout(removeWin,500);
}
