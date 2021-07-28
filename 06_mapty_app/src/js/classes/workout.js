export default class Workout {
  constructor(type, duration) {
    this.type = type;
    this.duration = duration;

    this.date = new Date().toDateString();
  }
}
