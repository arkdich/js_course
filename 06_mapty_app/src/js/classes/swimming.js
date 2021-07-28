import Workout from './workout';

export default class Swimmimg extends Workout {
  constructor(duration, distance) {
    super(duration);
    this.distance = distance;
  }
}
