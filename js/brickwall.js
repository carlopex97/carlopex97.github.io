class BrickWall {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.rows = BW_ROWS;
    this.cols = BW_COLUMNS;
    this.brickWidth = 50;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.initBricks();
  }

  initBricks() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x =
          j * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
        const y =
          i * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
        this.bricks.push(new Brick(this.ctx, x, y));
      }
    }
  }

  draw() {
    for (const brick of this.bricks) {
      brick.draw();
    }
  }
}
