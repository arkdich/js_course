import RunningCycling from './classes/runningCycling';
import Swimming from './classes/swimming';
import Custom from './classes/custom';
import { renderHeader, renderStats } from './components';

export function addEntry(ev) {
  ev.preventDefault();

  const form = ev.target;

  const workouts = getWorkouts();
  workouts.push(createEntryObj(form));

  form.remove();

  setWorkouts(workouts);
  renderWorkouts();
}

export function renderWorkouts() {
  const cont = document.querySelector('.entry-wrapper');
  const workouts = getWorkouts();

  cont.innerHTML = '';

  workouts.forEach((workout) => {
    const entry = createEntry(workout);

    cont.append(entry);
  });
}

function createEntry(workout) {
  const entry = document.createElement('div');
  entry.className = 'entry entry_filled';

  entry.classList.add(getBorderStyle(workout.type));

  entry.innerHTML = getHeader(workout);
  entry.insertAdjacentHTML('beforeend', getStats(workout));

  return entry;
}

function getBorderStyle(type) {
  switch (type) {
    case 'running':
      return 'lb_1';
    case 'swimming':
      return 'lb_2';
    case 'cycling':
      return 'lb_3';
    case 'custom':
      return 'lb_4';
    default:
      return '';
  }
}

function getHeader({ type, date, title }) {
  let titleStr;
  let dateStr = `${date.split(' ')[1]} ${date.split(' ')[2]}`;

  if (title) {
    titleStr = title[0].toUpperCase() + title.slice(1);
  } else {
    titleStr = type[0].toUpperCase() + type.slice(1);
  }

  const header = renderHeader(titleStr, dateStr);

  return header;
}

function getStats(workout) {
  const stats = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in workout) {
    if (!Object.hasOwnProperty.call(workout, key)) continue;

    if (key === 'date' || key === 'type') continue;

    if (key === 'distance')
      stats.push(renderStats('🏃‍♀️', workout.distance, 'km'));
    if (key === 'duration')
      stats.push(renderStats('⏱', workout.duration, 'min'));
    if (key === 'elevation')
      stats.push(renderStats('⛰', workout.elevation, 'm'));
    if (key === 'count') stats.push(renderStats('🔄', workout.count, 'times'));
  }

  return stats.join('');
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

function getWorkouts() {
  return JSON.parse(localStorage.getItem('workouts')).reverse() ?? [];
}

function setWorkouts(workouts) {
  localStorage.setItem('workouts', JSON.stringify(workouts));
}
