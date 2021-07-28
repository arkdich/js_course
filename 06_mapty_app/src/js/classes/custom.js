import Workout from './workout';

export default class Custom extends Workout {
  constructor(duration, title, count) {
    super(duration);
    this.title = title;
    this.count = count;
  }
}
