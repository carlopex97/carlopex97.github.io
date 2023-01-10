class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.startInterval = null;
    this.brick = new Brick(this.ctx);
    this.brickWall = new BrickWall(this.ctx);
    this.paddle = new Paddle(this.ctx);
    this.ball = new Ball(this.ctx);
    this.background = new Background(this.ctx);
    this.lives = 3;
    this.score = 0;
    this.paused = false;
    this.started = false;
    this.gameOverAudio = new Audio("/resources/sounds/ArkanoidGameOver.wav");
    this.lifeLostAudio = new Audio("/resources/sounds/ArkanoidBottomSound.wav");
    this.soundtrack = new Audio("/resources/sounds/ArkanoidBSO.mp3");
  }

  start() {
    this.stop();
    this.initListeners();
    this.ball.x = this.paddle.x + this.paddle.w / 2 - this.ball.ballRadius / 2;
    this.ball.y = this.paddle.y - this.ball.h;
    this.draw();
    this.soundtrack.loop='true';
    this.soundtrack.play();
    document.addEventListener("keydown", (event) => {
      if (this.spacepressed === true) {
        return;
      }

      if (event.keyCode === 32) {
        this.startInterval = null;
        this.spacepressed = true;
        this.interval = setInterval(() => {
          if (this.paused) {
            return;
          }
          this.clear();
          this.win(this.ctx, this);
          this.draw();
          this.checkCollisions();
          this.move();
          this.ctx.font = "18px Arial";
          this.ctx.fillStyle = "red";
          this.ctx.fillText("Vidas: " + this.lives, 10, 330);
          this.ctx.fillText("Score: " + this.score, 500, 330);
        }, 1000 / 60);
      }
    });
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.paddle.onKeyDown(e.keyCode);
    };
    document.onkeyup = (e) => {
      this.paddle.onKeyUp(e.keyCode);
    };
  }

  stop() {
    clearInterval(this.interval);
  }

  gameOver() {
    console.log("Game over!");
    this.gameOverAudio.play();
    this.gameOverScreen();
  }

  /*firstStart() {
    if (!this.started) {
      this.ball.x =
        this.paddle.x + this.paddle.w / 2 - this.ball.ballRadius / 2;
      this.ball.y = this.paddle.y - this.ball.h;
      
      this.startInterval = setInterval(() => {
        this.clear();
        this.paddle.move();
        this.ball.x =
          this.paddle.x + this.paddle.w / 2 - this.ball.ballRadius / 2;
        this.draw();
      }, 1000 / 60);
    }
  }*/

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    if (!DEBUG) {
      const pauseButton = document.getElementById("pause-button");
      pauseButton.style.visibility = "hidden";
    }

    this.background.draw();
    this.brickWall.draw();
    this.paddle.draw();
    this.ball.draw();
  }

  move() {
    this.paddle.move();
    this.ball.move();
  }

  checkCollisions() {
    let done = false;
    if (this.ball.collidesWith(this.paddle)) {
      this.ball.collider(this.paddle);
      this.ball.vy = this.ball.vy * -1;
    }
    for (const brick of this.brickWall.bricks) {
      const collision = this.ball.collidesWith(brick);
      if (brick.active && collision) {
        console.log(collision);

        if (!done) {
          done = true;

          if (collision === "colx") {
            this.ball.vx *= -1;
          } else if (collision === "coly") {
            this.ball.vy *= -1;
          }
        }
        brick.destroy();
        this.score++;
        const brickCollisionAudio = new Audio(
          "/resources/sounds/Arkanoid SFX (1).wav"
        );
        brickCollisionAudio.volume = "0.1";
        brickCollisionAudio.play();
      }
    }
    if (this.ball.y + this.ball.h >= this.ctx.canvas.height) {
      this.ball.x =
        this.paddle.x + this.paddle.w / 2 - this.ball.ballRadius / 2;
      this.ball.y = this.paddle.y - this.ball.h;
      this.spacepressed = false;
      this.stop();
      this.draw();
      this.lives -= 1;
      this.lifeLostAudio.volume = "0.1";
      this.lifeLostAudio.play();
      if (this.lives === 0) {
        this.gameOver();
      }
    }
  }

  win(ctx, game) {
    if (this.brickWall.bricks.every((brick) => !brick.active)) {
      clearInterval(game.interval);
      ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "60px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Felicidades has ganado", ctx.canvas.width/2, ctx.canvas.height/2);
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + this.score, ctx.canvas.width/2, ctx.canvas.height/2 + 30);
      ctx.fillText("Presiona F5 para jugar otra vez", ctx.canvas.width/2, ctx.canvas.height/2 + 60);
    }
  
  
  }
  gameOverScreen() {
    this.stop();
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Game Over", this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    this.ctx.font = "20px Arial";
    this.ctx.fillText("Press F5 to play again", this.ctx.canvas.width/2, this.ctx.canvas.height/2 + 30);}
  togglePause() {
    if (!DEBUG) {
      pauseButton.style.display = "none";
      return;
    }
    this.paused = !this.paused;
  }
}
