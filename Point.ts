export default class Point{
  
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  distance(point: Point) {
    const a = Math.abs(this.x - point.x);
    const b = Math.abs(this.y - point.y);

    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }

  angle(point: Point) {
    if (point.x === this.x) {
      return this.y > point.y ? 180 : 0;
    }

    if (point.y === this.y) {
      return this.x > point.x ? -90 : 90;
    }

    return Math.atan2(point.y - this.y, point.x - this.x) * 180 / Math.PI;
  }
}
