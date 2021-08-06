import {
  renderSwimming,
  renderCustom,
  renderRunning,
  renderCycling,
} from './components';
import { addEntry } from './entryHandlers';
import {
  setFormBlock,
  getFormBlock,
  isMobile,
  focusEntryPoint,
  mymap,
  formMarker,
} from './utilities';
import { promptDeletingEntry } from './deletingHandlers';
import { fullscreenMap, renderMarker } from './mapHandlers';

export function addForm(ev) {
  const wrapper = document.querySelector('.entry-wrapper');
  const coords = ev.latlng;

  fullscreenMap(false);

  if (getFormBlock()) return;

  const newEntry = document.createElement('form');
  newEntry.className = 'entry form';
  newEntry.autocomplete = 'off';

  newEntry.innerHTML = renderRunning();

  newEntry.addEventListener('change', changeWorkoutType);
  newEntry.addEventListener('submit', (e) => addEntry(e, coords));
  newEntry.addEventListener('dblclick', promptDeletingEntry);

  if (isMobile()) {
    newEntry.addEventListener('change', changeFocus);
  }

  wrapper.prepend(newEntry);

  focusEntryPoint();
  setFormBlock(true);

  const marker = renderMarker(mymap, {
    coords: ev.latlng,
    type: 'Workout',
    date: new Date().toDateString(),
  });

  formMarker.set(marker);
}

function changeFocus(ev) {
  ev.preventDefault();

  if (!ev.target.matches('.entry__input')) return;

  const form = ev.target.closest('.entry');
  const targetInput = ev.target;
  const inputs = Array.from(form.querySelectorAll('input'));

  const targetType = targetInput.getAttribute('enterkeyhint');

  if (targetType === 'next') {
    const nextImputIndex = inputs.indexOf(targetInput) + 1;
    inputs[nextImputIndex].focus();
    return;
  }

  if (targetType === 'send') {
    if (form.checkValidity()) {
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );
    } else {
      highlightInvalid(form);

      form.dispatchEvent(
        new Event('invalid', { bubbles: true, cancelable: true })
      );
    }
  }
}

function changeWorkoutType(ev) {
  if (!ev.target.matches('.entry__type')) return;

  const select = ev.target;
  const cont = select.closest('.entry');

  if (cont.matches('.deleting')) {
    cont.querySelector('.deleting__cancel').click();
  }

  [].forEach.call(select.options, (option, index) => {
    if (select.selectedIndex !== index) return;

    switch (option.value) {
      case 'running':
        cont.innerHTML = renderRunning();
        break;
      case 'swimming':
        cont.innerHTML = renderSwimming();
        break;
      case 'cycling':
        cont.innerHTML = renderCycling();
        break;
      case 'custom':
        cont.innerHTML = renderCustom();
        break;
      default:
        break;
    }
  });

  focusEntryPoint();
}

function highlightInvalid(form) {
  const inputs = form.querySelectorAll('input');

  inputs.forEach((input) => {
    input.classList.remove('entry__input_invalid');

    if (!input.checkValidity()) input.classList.add('entry__input_invalid');
  });
}
