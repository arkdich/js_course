import Workout from './classes/workout';
import RunningCycling from './classes/runningCycling';
import Swimming from './classes/swimming';
import Custom from './classes/custom';

export function createEntry(ev) {
  ev.preventDefault();

  const cont = ev.target.closest('.entry-wrapper');
  const form = ev.target;
}
