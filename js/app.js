// Enemy constructor function
let Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

/*Update Method that moves bugs and resets them when they reach end of screen
aswell as checks for enemy/player colision*/
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  /*if the enemy reaches end of screen move enemy back to starting position off screen
  with random speed*/
  if (this.x > 502) {
    this.x = -100;
    this.speed = randomizeSpeed(200, 550);

  }
  /*Check for colision with player, if colission happen then reset player to start
  position and decrease player lives*/
  let colx = Math.abs(this.x - player.x);
  let coly = Math.abs(this.y - player.y);
  if ((colx < 75) && (coly < 75)) {
    player.x = 202;
    player.y = 404;
    player.lives--;
  }
  //call checkLose function to see if player ran out of lives
  checkLose();
};
//Checks if player lost and if true reset counters and player lives for next game
let checkLose = () => {
  if (player.lives < 0) {
    alert('You lost! Click OK to Play Again.');
    player.lives = 5;
    counter = 0;
  }

}
/*function that generates a random speed to be called in Enemy.prototype.update
sets a random speed for enemies to move on the screen*/
function randomizeSpeed(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

let counter = 0;
/*Check if player has reached the finish-line enough times to win then
 resets lives and counter for next game.*/
function checkWin() {
  counter++;
  if (counter > 4) {
    alert("You Win! Click OK to Play Again.");
    counter = 0;
    player.lives = 5;
  }

}
// Player class to create player object
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.lives = 5;

  }
  //resets player position when player reaches finish-line and check win
  update() {
    if (this.y < 50) {
      this.x = 202;
      this.y = 404;
      checkWin();
    }
  };
  //Draw player on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.getElementById("livesUi").innerText = player.lives;
    document.getElementById("wins").innerText = 5 - counter;
  }

  //Handles movement of player on screen
  handleInput(key) {
    switch (key) {
      case 'up':
        if (this.y >= 0) {
          this.y -= 83;
        }
        break;
      case 'down':
        if (this.y <= 350) {
          this.y += 83;
        }
        break;
      case 'left':
        if (this.x >= 100) {
          this.x -= 101;
        }
        break;
      case 'right':
        if (this.x <= 305) {
          this.x += 101;
        }
        break;
    }
  }
};

//Creates player and enemy objects
let player = new Player(202, 404);

let enemy1 = new Enemy(0, 230, 206);
let enemy2 = new Enemy(-360, 150, 350);
let enemy3 = new Enemy(-120, 65, 520);

//put enemies in an array
let allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
