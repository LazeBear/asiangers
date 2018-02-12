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

  checkMove(pos: Coordination, type: number) {
    if (type === 1) { // vert
      return (this.x === pos.x - 1 && this.y === pos.y - 1) ||
        (this.x === pos.x + 1 && this.y === pos.y - 1) ||
        (this.x === pos.x - 1 && this.y === pos.y + 1) ||
        (this.x === pos.x + 1 && this.y === pos.y + 1) ||
        (this.x === pos.x && this.y === pos.y + 2) ||
        (this.x === pos.x && this.y === pos.y - 2);
    }

    if (type === 2) {
      return (this.x === pos.x - 1 && this.y === pos.y - 1) ||
        (this.x === pos.x + 1 && this.y === pos.y - 1) ||
        (this.x === pos.x - 1 && this.y === pos.y + 1) ||
        (this.x === pos.x + 1 && this.y === pos.y + 1) ||
        (this.x === pos.x + 2 && this.y === pos.y) ||
        (this.x === pos.x - 2 && this.y === pos.y);
    }

    return false;
  }
}
