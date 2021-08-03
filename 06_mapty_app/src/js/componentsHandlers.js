import { renderHeader, renderRunning, renderStats } from './components';
import { toStartsWithUpper } from './utilities';

export function getBorderStyle(type) {
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

export function getHeader({ type, date, title }) {
  const headerTitle = title
    ? toStartsWithUpper(title)
    : toStartsWithUpper(type);

  const { 1: month, 2: day } = date.split(' ');
  const headerDate = `${month} ${Number(day)}`;

  const header = renderHeader(headerTitle, headerDate);

  return header;
}

export function getStats(workout) {
  const stats = [];

  Object.keys(workout).forEach((key) => {
    if (key === 'date' || key === 'type') return;

    if (key === 'distance')
      stats.push(
        renderStats(getDistanceStyle(workout.type), workout.distance, 'km')
      );
    if (key === 'duration')
      stats.push(renderStats('⏱', workout.duration, 'min'));
    if (key === 'elevation')
      stats.push(renderStats('⛰', workout.elevation, 'm'));
    if (key === 'count') stats.push(renderStats('🔄', workout.count, 'times'));
    if (key === 'pace') stats.push(renderStats('⚡', workout.pace, 'm/km'));
    if (key === 'average')
      stats.push(renderStats('⚡', workout.average, 's/100m'));
    if (key === 'cadence')
      stats.push(renderStats('🦶', workout.cadence, 'spm'));
    if (key === 'speed') stats.push(renderStats('⚡', workout.speed, 'km/h'));
  });

  return stats.join('');
}

export function getDistanceStyle(workoutType) {
  switch (workoutType) {
    case 'running':
      return '🏃‍♀️';
    case 'swimming':
      return '🏊‍♂️';
    case 'cycling':
      return '🚴‍♂️';
    case 'custom':
      return '🤼';
    default:
      return '';
  }
}
