class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;
    this.x = 0;
    this.y = 0;
    this.background = new Image();
    this.background.src = "/resources/img/background.png";
    this.background.onload = () => {
      this.backgroundPattern = this.ctx.createPattern(
        this.background,
        "repeat"
      );
    };
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.backgroundPattern;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.restore();
  }
}
