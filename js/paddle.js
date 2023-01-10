class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.h = 12;
    this.w = 75;
    this.y = this.ctx.canvas.height - (this.h + 20);
    this.x = (this.ctx.canvas.width - this.w) / 2;
    this.vx = 0;
    this.type = "paddle";
    this.image = new Image();
    this.image.src = "/resources/img/paddle.png";
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
    if (this.x <= 0) {
      this.vx = 0;
      this.x = 0;
    }
    if (this.x + this.w >= this.ctx.canvas.width) {
      this.vx = 0;
      this.x = this.ctx.canvas.width - this.w;
    }
  }
  /*shoot(){

    }*/
  onKeyUp(key) {
    console.log(key);
    switch (key) {
      case 39:
      case 37:
        this.vx = 0;
        break;
    }
  }
  onKeyDown(key) {
    console.log(key);
    switch (key) {
      case 39:
        this.vx = 6;
        break;
      case 37:
        this.vx = -6;
        break;
    }
  }
}
