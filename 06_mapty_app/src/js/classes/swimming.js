import Workout from './workout';

export default class Swimmimg extends Workout {
  constructor(coords, type, duration, distance) {
    super(coords, type, duration);
    this.distance = distance;

    const dist = 100;
    const secInMin = 60;

    this.average = (
      ((dist * this.duration) / (this.distance * 1000)) *
      secInMin
    ).toFixed(1);
  }
}
