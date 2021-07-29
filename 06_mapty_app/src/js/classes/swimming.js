import Workout from './workout';

export default class Swimmimg extends Workout {
  constructor(type, duration, distance) {
    super(type, duration);
    this.distance = distance;

    const dist = 100;
    const secInMin = 60;

    this.average = (
      ((dist * this.duration) / (this.distance * 1000)) *
      secInMin
    ).toFixed(1);
  }
}
