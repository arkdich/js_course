import Workout from './workout';

export default class RunningCycling extends Workout {
  constructor(type, duration, distance, elevation) {
    super(type, duration);
    this.distance = distance;
    this.elevation = elevation;
  }
}
