import Workout from './workout';

export default class RunningCycling extends Workout {
  constructor(duration, distance, elevation) {
    super(duration);
    this.distance = distance;
    this.elevation = elevation;
  }
}
