class Brick {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.h = 20;
    this.w = 50;
    this.type = "brick";
    this.images = [
      "/resources/img/blue.png",
      "/resources/img/red.png",
      "/resources/img/yellow.png",
      "/resources/img/green.png",
      "/resources/img/gray.png",
      "/resources/img/light_blue.png",
      "/resources/img/orange.png",
      "/resources/img/pink.png",
    ];
    this.active = true;
    this.image = new Image();
    this.image.src = this.images[this.randomImage()];
  }

  randomImage() {
    return Math.floor(Math.random() * this.images.length);
  }

  draw() {
    if (DEBUG) {
      this.ctx.strokeStyle = "red";
      this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    if (this.active) {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
  }

  destroy() {
    this.active = false;
  }
}
