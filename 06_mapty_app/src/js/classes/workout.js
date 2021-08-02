export default class Workout {
  constructor(coords, type, duration) {
    this.coords = coords;
    this.type = type;
    this.duration = duration;

    this.id = Date.now();
    this.date = new Date().toDateString();
  }
}
