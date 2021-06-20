import accounts from './usersData.js';
import { getTotalBalance } from './formatters.js';

export function acceptRequest(user, reqObj, index) {
  const sender = accounts.find((acc) => acc.login === reqObj.from);

  if (reqObj.amount > getTotalBalance(user.movements) || sender === undefined)
    return;

  user.incomingRequests.splice(index, 1);

  const reqToChange = sender.sentRequests.find(
    (req) => req.date === reqObj.date
  );

  reqToChange.status = 'Fullfilled';
}

export function declineRequest(user, reqObj, index) {
  user.incomingRequests.splice(index, 1);

  const sender = accounts.find((acc) => acc.login === reqObj.from);

  if (!sender) return;

  const reqToChange = sender.sentRequests.find(
    (req) => req.date === reqObj.date
  );

  reqToChange.status = 'Declined';
}
