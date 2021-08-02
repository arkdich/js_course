import Workout from './workout';

export default class Running extends Workout {
  constructor(coords, type, duration, distance, cadence) {
    super(coords, type, duration);
    this.distance = distance;
    this.cadence = cadence;

    this.pace = (this.duration / this.distance).toFixed(1);
  }
}
