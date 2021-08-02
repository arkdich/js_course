import Workout from './workout';

export default class Custom extends Workout {
  constructor(coords, type, duration, title, count) {
    super(coords, type, duration);
    this.title = title;
    this.count = count;
  }
}
