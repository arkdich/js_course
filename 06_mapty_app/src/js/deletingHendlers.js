import { getWorkouts, setFormBlock, setWorkouts } from './utilities';

export function promptDeletingEntry(ev) {
  const cont = ev.target.closest('.entry');

  if (cont.matches('.deleting')) return;

  cont.classList.add('deleting');

  cont.insertAdjacentHTML(
    'beforeend',
    `<button type="button" class="deleting__delete"></button>
       <button type="button" class="deleting__cancel"></button>`
  );

  cont.addEventListener('click', deletingHandler);
}

function deletingHandler(ev) {
  if (!ev.target.matches('button')) return;

  if (ev.target.matches('.deleting__delete')) {
    setFormBlock(false);
    this.classList.add('entry_removin');

    setTimeout(() => {
      const wrapper = this.closest('.entry-wrapper');
      const index = Array.from(wrapper.children).indexOf(this);

      deleteWorkout(index);

      this.remove();
    }, 200);

    return;
  }

  if (ev.target.matches('.deleting__cancel')) {
    this.classList.remove('deleting');

    const deleteButtons = this.querySelectorAll('button:not([type="submit"])');

    deleteButtons.forEach((button) => button.remove());
  }
}

function deleteWorkout(index) {
  const workouts = getWorkouts();
  const indexCopy = index === 0 ? -1 : -Math.abs(index) - 1;

  workouts.splice(indexCopy, 1);

  setWorkouts(workouts);
}
