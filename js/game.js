class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.startInterval = null;
    this.brick = new Brick(ctx);
    this.brickWall = new BrickWall(ctx);
    this.paddle = new Paddle(ctx);
    this.ball = new Ball(ctx);
    this.background = new Background(ctx);
    this.lives = 9999;
    this.score = 0;
    this.paused = false;
    this.started = false;
    this.gameOverAudio = new Audio("/resources/sounds/ArkanoidGameOver.wav");
    this.lifeLostAudio = new Audio("/resources/sounds/ArkanoidBottomSound.wav");
  }

  start() {
    this.stop();
    this.initListeners();
    this.ball.x = this.paddle.x + this.paddle.w / 2 - this.ball.ballRadius / 2;
    this.ball.y = this.paddle.y - this.ball.h;
    this.draw();
    
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
          this.win();
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
    this.stop();
  }

  firstStart() {
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
  }

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

  win() {
    if (this.brickWall.bricks.every((brick) => !brick.active)) {
      alert("Felicidades has ganado");
      this.brickWall = new BrickWall(ctx);
      game.start();
    }
  }
  togglePause() {
    if (!DEBUG) {
      pauseButton.style.display = "none";
      return;
    }
    this.paused = !this.paused;
  }
}
