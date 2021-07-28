import RunningCycling from './classes/runningCycling';
import Swimming from './classes/swimming';
import Custom from './classes/custom';

export function addEntry(ev) {
  ev.preventDefault();

  const cont = ev.target.closest('.entry-wrapper');
  const form = ev.target;

  const workouts = JSON.parse(localStorage.getItem('workouts')) ?? [];
  workouts.push(createEntryObj(form));

  localStorage.setItem('workouts', JSON.stringify(workouts));
}

function createEntryObj({ elements }) {
  const {
    duration: { value: duration },
    type: { value: type },
  } = elements;

  if (type === 'running' || type === 'cycling') {
    const {
      distance: { value: distance },
      elevation: { value: elevation },
    } = elements;
    return new RunningCycling(type, duration, distance, elevation);
  }

  if (type === 'swimming') {
    const {
      distance: { value: distance },
    } = elements;
    return new Swimming(type, duration, distance);
  }

  if (type === 'custom') {
    const {
      title: { value: title },
      count: { value: count },
    } = elements;
    return new Custom(type, duration, title, count);
  }

  return {};
}

function fillHeader() {}
