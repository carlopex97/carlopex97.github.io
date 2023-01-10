class Ball {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.ballRadius = 20;
    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height - 40;
    this.h = this.ballRadius;
    this.w = this.ballRadius;
    this.vx = 2.5;
    this.vy = 3;
    this.image = new Image();
    this.image.src = "/resources/img/ball.png";
  }

  draw() {
    this.ctx.save();
    if (DEBUG) {
      this.ctx.strokeStyle = "red";
      this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    this.ctx.restore();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y <= 0) {
      this.vy *= -1;
      this.y = 0;
    }
    if (this.y + this.ballRadius >= this.ctx.canvas.height) {
      this.vy *= -1;
      this.y = this.ctx.canvas.height - this.ballRadius;
    }
    if (this.x <= 0) {
      this.vx *= -1;
      this.x = 0;
    }
    if (this.x + this.ballRadius >= this.ctx.canvas.width) {
      this.vx *= -1;
      this.x = this.ctx.canvas.width - this.ballRadius;
    }
  }

  collidesWith(element) {
    const coll =
      this.x + this.w > element.x &&
      this.x < element.x + element.w &&
      this.y < element.y + element.h &&
      this.h + this.y > element.y;

    if (!coll) {
      return false;
    }
    console.log("this.x: " + this.x);
    console.log("element.x: " + element.x);
    console.log("element.x + element.w: " + (element.x + element.w));
    console.log("this.y: " + this.y);
    console.log("element.y: " + element.y);
    console.log("element.y + element.h: " + (element.y + element.h));

    const x = this.x + this.w / 2;

    if (x > element.x && x < element.x + element.w) {
      return "coly";
    }

    return "colx";

    /*if (this.x > element.x && this.x < element.x + element.w) {
      // identificar derecha o izquierda
      return "colx";
    }
    if (this.y > element.y && this.y < element.y + element.h) {
      // identificar arriba o abajo
      return "coly";
    }*/

    // return false, "colx"¨or "coly"
  }
  collider(paddle) {
    const ballCenterX = this.x + this.w / 2;
    const paddleCenterX = paddle.x + paddle.w / 2;

    if (ballCenterX < paddleCenterX) {
      this.vx = -Math.abs(this.vx);
    } else {
      this.vx = Math.abs(this.vx);
    }

    this.y = paddle.y - this.h;
  }
}
