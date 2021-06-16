import { formatDate, formatCurrency, getStatusStyle } from './formatters.js';

export function showRequests(user) {
  sortRequests(user.incomingRequests);
  sortRequests(user.sentRequests);

  renderIncomingRequests(user);
  renderSentRequests(user);
}

export function sortRequests(requests) {
  return requests.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function renderIncomingRequests({
  locale,
  currency,
  incomingRequests: requests,
}) {
  const incRequests = document.querySelector('.requests_inc');
  incRequests.innerHTML = '';

  if (requests.length === 0) {
    const requestEntry = document.createElement('div');

    requestEntry.className = 'requests__entry  requests__entry_empty';
    requestEntry.innerText = "You've got no requests";

    incRequests.append(requestEntry);
    return;
  }

  requests.forEach((request) => {
    const requestEntry = document.createElement('div');

    requestEntry.className = 'requests__entry';

    requestEntry.innerHTML = `
      <div class="requests__info">
        <div class="requests__block">
          <div class="requests__amount">${formatCurrency(
            currency,
            request.amount
          )}</div>
          <div class="requests__from">From: ${request.from}</div>
        </div>
        <div class="requests__date">${formatDate(
          locale,
          new Date(request.date)
        )}</div>
      </div>
      <div class="requests__controls">
        <button class="btn btn_request bg-green">Accept</button>
        <button class="btn btn_request bg-red c-">Decline</button>
      </div>`;

    incRequests.append(requestEntry);
  });
}

export function renderSentRequests({
  locale,
  currency,
  sentRequests: requests,
}) {
  const sentRequests = document.querySelector('.requests_sent');
  sentRequests.innerHTML = '';

  if (requests.length === 0) {
    const requestEntry = document.createElement('div');

    requestEntry.className = 'requests__entry  requests__entry_empty';
    requestEntry.innerText = "You haven't sent any request yet";

    sentRequests.append(requestEntry);
    return;
  }

  requests.forEach((request) => {
    const requestEntry = document.createElement('div');

    requestEntry.className = 'requests__entry';

    requestEntry.innerHTML = `
      <div class="requests__info">
        <div class="requests__block">
          <div class="requests__amount">${formatCurrency(
            currency,
            request.amount
          )}</div>
          <div class="requests__from">To: ${request.to}</div>
        </div>
        <div class="requests__date">${formatDate(
          locale,
          new Date(request.date)
        )}</div>
      </div>
      <div class="requests__status ${getStatusStyle(request.status)}">${
      request.status
    }</div>`;

    sentRequests.append(requestEntry);
  });
}
