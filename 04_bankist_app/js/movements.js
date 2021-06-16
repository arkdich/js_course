import { formatDate, formatCurrency } from './formatters.js';
import { setIsSorted } from './globalVar.js';

export function showMovements(user, isDescending) {
  const movementsWrapper = document.querySelector('.movements');

  movementsWrapper.innerHTML = '';

  const movementsMap = new Map();

  for (let i = 0; i < user.movements.length; i++) {
    movementsMap.set(user.movementsDates[i], user.movements[i]);
  }

  const sortedMovements = sortMovements(movementsMap, isDescending);

  sortedMovements.forEach((entry, index) => {
    const movementEntry = document.createElement('div');

    movementEntry.className = 'movements__entry';
    movementEntry.innerHTML = `
      <p class="movements__type ${entry[1] > 0 ? 'bg-green' : 'bg-red'}">
      ${index + 1} ${entry[1] > 0 ? 'Deposit' : 'Withdrawal'}</p>
      <p class="movements__date">${formatDate(
        user.locale,
        new Date(entry[0])
      )}</p>
      <p class="movements__value">${formatCurrency(
        user.currency,
        entry[1]
      )}</p>`;

    movementsWrapper.append(movementEntry);
  });
}

export function sortMovements(movements, isDescending) {
  const movementsArr = Array.from(movements);

  if (!isDescending) {
    setIsSorted(false);
    movementsArr.sort((a, b) => new Date(b[0]) - new Date(a[0]));
  } else {
    setIsSorted(true);
    movementsArr.sort((a, b) => b[1] - a[1]);
  }

  return movementsArr;
}
