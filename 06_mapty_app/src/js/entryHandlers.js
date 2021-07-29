import RunningCycling from './classes/runningCycling';
import Swimming from './classes/swimming';
import Custom from './classes/custom';
import { createEntry } from './componentsHandlers';
import { getWorkouts, setFormBlock, setWorkouts } from './utilities';

export function addEntry(ev) {
  ev.preventDefault();

  const form = ev.target;

  const workouts = getWorkouts();
  workouts.push(createEntryObj(form));

  form.remove();
  setFormBlock(false);

  setWorkouts(workouts);
  renderWorkouts();
}

export function renderWorkouts() {
  const cont = document.querySelector('.entry-wrapper');
  const workouts = getWorkouts();
  const fragment = new DocumentFragment();

  cont.innerHTML = '';

  workouts.forEach((workout) => {
    const entry = createEntry(workout);

    fragment.prepend(entry);
  });

  cont.append(fragment);
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
