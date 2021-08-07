import { formBlock, workoutArray } from './utilities';

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
    formBlock.set(false);
    this.classList.add('entry_removing');

    setTimeout(() => {
      const entryIndex = workoutArray
        .get()
        .findIndex((w) => w.id === Number(this.dataset.id));

      deleteWorkout(entryIndex);

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
  const workouts = workoutArray.get();

  workouts.splice(index, 1);

  workoutArray.set(workouts);
}
