import { renderHeader, renderStats } from './components';
import { toStartsWithUpper } from './utilities';

export function createEntry(workout) {
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
  const headerTitle = title
    ? toStartsWithUpper(title)
    : toStartsWithUpper(type);

  const { 1: month, 2: day } = date.split(' ');
  const headerDate = `${month} ${day}`;

  const header = renderHeader(headerTitle, headerDate);

  return header;
}

function getStats(workout) {
  const stats = [];

  Object.keys(workout).forEach((key) => {
    if (key === 'date' || key === 'type') return;

    if (key === 'distance')
      stats.push(renderStats('🏃‍♀️', workout.distance, 'km'));
    if (key === 'duration')
      stats.push(renderStats('⏱', workout.duration, 'min'));
    if (key === 'elevation')
      stats.push(renderStats('⛰', workout.elevation, 'm'));
    if (key === 'count') stats.push(renderStats('🔄', workout.count, 'times'));
    if (key === 'pace') stats.push(renderStats('⚡', workout.pace, 'm/km'));
    if (key === 'average')
      stats.push(renderStats('⚡', workout.average, 's/100m'));
  });

  return stats.join('');
}
