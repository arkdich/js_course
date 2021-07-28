import Workout from './workout';

export default class Custom extends Workout {
  constructor(type, duration, title, count) {
    super(type, duration);
    this.title = title;
    this.count = count;
  }
}
