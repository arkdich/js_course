import Workout from './workout';

export default class Swimmimg extends Workout {
  constructor(type, duration, distance) {
    super(type, duration);
    this.distance = distance;
  }
}
