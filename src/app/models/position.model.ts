export class Coordination {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equal(pos: Coordination) {
    return (pos.x === this.x && pos.y === this.y);
  }

  checkMove(pos: Coordination) {
    return (this.x === pos.x - 1 && this.y === pos.y - 1) ||
      (this.x === pos.x + 1 && this.y === pos.y - 1) ||
      (this.x === pos.x - 1 && this.y === pos.y + 1) ||
      (this.x === pos.x + 1 && this.y === pos.y + 1);
  }
}
