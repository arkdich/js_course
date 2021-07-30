import {
  renderRunningCycling,
  renderSwimming,
  renderCustom,
} from './components';
import { addEntry } from './entryHandlers';
import { setFormBlock, getFormBlock, isMobile } from './utilities';

export function addForm() {
  const wrapper = document.querySelector('.entry-wrapper');

  if (getFormBlock()) return;

  const newEntry = document.createElement('form');
  newEntry.className = 'entry';
  newEntry.autocomplete = 'off';

  newEntry.innerHTML = renderRunningCycling('running');

  newEntry.addEventListener('change', changeWorkoutType);
  newEntry.addEventListener('submit', addEntry);

  if (isMobile()) {
    newEntry.addEventListener('keyup', changeFocus);
  }

  wrapper.prepend(newEntry);

  setFormBlock(true);
}

function changeFocus(ev) {
  ev.preventDefault();
  if (!ev.target.matches('.entry__input') || ev.key !== 'Enter') return;

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

function highlightInvalid(form) {
  const inputs = form.querySelectorAll('input');

  inputs.forEach((input) => {
    input.classList.remove('entry__input_invalid');

    if (!input.checkValidity()) input.classList.add('entry__input_invalid');
  });
}