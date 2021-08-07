import Running from './classes/running';
import Cycling from './classes/cycling';
import Swimming from './classes/swimming';
import Custom from './classes/custom';
import { mymap, formBlock, workoutArray } from './utilities';
import { getBorderStyle, getHeader, getStats } from './componentsHandlers';
import { promptDeletingEntry } from './deletingHandlers';
import { renderMarker } from './mapHandlers';

export function addEntry(ev, coords) {
  ev.preventDefault();

  const form = ev.target;
  const cont = document.querySelector('.entry-wrapper');

  const workouts = workoutArray.get();

  const newWorkout = createEntryObj(form, coords);
  workouts.push(newWorkout);

  workoutArray.set(workouts);

  form.remove();
  formBlock.set(false);

  cont.prepend(createEntry(newWorkout));
  renderMarker(mymap, newWorkout).openPopup();
}

export function renderWorkouts() {
  const cont = document.querySelector('.entry-wrapper');
  const workouts = workoutArray.get();
  const fragment = new DocumentFragment();

  cont.innerHTML = '';

  workouts.forEach((workout) => {
    const entry = createEntry(workout);
    renderMarker(mymap, workout);

    fragment.prepend(entry);
  });

  cont.append(fragment);
}

function createEntryObj(formObj, coords) {
  const { elements } = formObj;
  const {
    duration: { value: duration },
    type: { value: type },
  } = elements;

  if (type === 'running') {
    const {
      distance: { value: distance },
      cadence: { value: cadence },
    } = elements;
    return new Running(coords, type, duration, distance, cadence);
  }

  if (type === 'cycling') {
    const {
      distance: { value: distance },
      elevation: { value: elevation },
    } = elements;
    return new Cycling(coords, type, duration, distance, elevation);
  }

  if (type === 'swimming') {
    const {
      distance: { value: distance },
    } = elements;
    return new Swimming(coords, type, duration, distance);
  }

  if (type === 'custom') {
    const {
      title: { value: title },
      count: { value: count },
    } = elements;
    return new Custom(coords, type, duration, title, count);
  }

  return {};
}

function createEntry(workout) {
  const entry = document.createElement('div');
  entry.className = 'entry entry_filled';

  entry.classList.add(getBorderStyle(workout.type));

  entry.dataset.id = workout.id;

  entry.innerHTML = getHeader(workout);
  entry.insertAdjacentHTML('beforeend', getStats(workout));

  entry.addEventListener('dblclick', promptDeletingEntry);

  return entry;
}
