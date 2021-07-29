import {
  renderRunningCycling,
  renderSwimming,
  renderCustom,
} from './components';
import { addEntry } from './entryHandlers';
import { setFormBlock, getFormBlock } from './utilities';

export function addForm() {
  const wrapper = document.querySelector('.entry-wrapper');

  if (getFormBlock()) return;

  const newEntry = document.createElement('form');
  newEntry.className = 'entry';
  newEntry.innerHTML = renderRunningCycling('running');

  newEntry.addEventListener('change', changeWorkoutType);
  newEntry.addEventListener('submit', addEntry);

  wrapper.prepend(newEntry);

  setFormBlock(true);
}

function changeWorkoutType(ev) {
  if (!ev.target.matches('.entry__type')) return;

  const select = ev.target;
  const cont = select.closest('.entry');

  [].forEach.call(select.options, (option, index) => {
    if (select.selectedIndex !== index) return;

    switch (option.value) {
      case 'running':
        cont.innerHTML = renderRunningCycling('running');
        break;
      case 'swimming':
        cont.innerHTML = renderSwimming();
        break;
      case 'cycling':
        cont.innerHTML = renderRunningCycling('cycling');
        break;
      case 'custom':
        cont.innerHTML = renderCustom();
        break;
      default:
        break;
    }
  });
}
