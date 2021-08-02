import Workout from './workout';

export default class Cycling extends Workout {
  constructor(coords, type, duration, distance, elevation) {
    super(coords, type, duration);
    this.distance = distance;
    this.elevation = elevation;

    this.speed = (this.duration / (this.distance / 60)).toFixed(1);
  }
}
