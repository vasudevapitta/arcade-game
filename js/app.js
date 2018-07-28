/*
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

/* Character is the Superclass which is the main class */
class Character {
    constructor(sprite="", finalSprite="", x=2, y=5){
        this.sprite = sprite;
        this.finalSprite = "images/"+sprite;
        this.x = x;
        this.y = y;
    }

    update(dt){
        this.isOutOfBoundsX = this.x > 5;
        this.isOutOfBoundsY = this.y < 1;
    }

    render(){
        ctx.drawImage(Resources.get(this.finalSprite), this.x*101, this.y*83);
    }

    checkCollisions(playerOrEnemy){
        if(this.y === playerOrEnemy.y){
            if(this.x >= playerOrEnemy.x - 0.8 && this.x <= playerOrEnemy.x + 0.8){
                return true;
            }
        }
        else {
            return false;
        }
    }
}

/* Gem class is the Subclass which extends from the Superclass called Character 
This Gem class is currently not in use, I will use it later on when I want to add gems to my game and let the player collect them */
class Gem extends Character {
    constructor({sprite="Gem Orange.png", finalSprite="", x=0, y=0}){
        super(sprite,finalSprite,x,y);
    }

    update(dt){
        super.update();
    }

    render(){
        super.render();
    }
}

/* Enemy class is the Subclass which extends from Character */
class Enemy extends Character {
    constructor({sprite="enemy-bug.png", finalSprite="", x=0, y=0, speed=0}={}){
        super(sprite,finalSprite,x,y);
        this.speed = speed;
    }

    update(dt){
        super.update();
        if(this.isOutOfBoundsX){
            this.x = -1;
        }
        else {
            this.x += dt + this.speed;
        }
    }

    render(){
        super.render();
    }
}

/* Player class is the Subclass which extends from Character */
class Player extends Character {
    constructor({sprite="char-boy.png", finalSprite="", x=2, y=5}={}){
        super(sprite,finalSprite,x,y);
        this.moving = false;
        this.win = false;
    }

    update(dt){
        super.update(dt);
        if(this.isOutOfBoundsY && !this.moving && !this.win){
            document.querySelector("#result").classList.remove("hide");
            this.win = true;
        }
    }

    render(){
        super.render();
        this.moving = false;
    }

    handleInput(input){
        switch (input) {
            case 'left':
            this.x = this.x > 0 ? this.x - 1 : this.x;
            break;

            case 'up':
            this.y = this.y > 0 ? this.y - 1 : this.y;
            break;

            case 'right':
            this.x = this.x < 4 ? this.x + 1 : this.x;
            break;

            case 'down':
            this.y = this.y < 5 ? this.y + 1 : this.y;
            break;

            default:
            break;
        }

        this.moving = true;
    }
}


/* speed levels - normal 0, slow 0.02, medium 0.04, fast 0.06 */
/* x and y values cannot be decimals! */
const enemy1 = new Enemy({sprite:"enemy-bug1.png",x:2, y:1, speed:0});
const enemy2 = new Enemy({sprite:"enemy-bug2.png", x:0, y:3,speed:0.04});
const enemy3 = new Enemy({sprite:"enemy-bug3.png", x:0, y:4, speed:0.02});
const enemy4 = new Enemy({y:2});

const player = new Player();

//all the enemies should be in this array
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

//const gem = new Gem({x:4, y:2});


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});