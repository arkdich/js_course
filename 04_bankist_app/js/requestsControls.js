import accounts from './usersData.js';
import { getTotalBalance } from './formatters.js';

export function acceptRequest(user, reqObj, index) {
  if (reqObj.ammount > getTotalBalance(user.movements)) return;

  user.incomingRequests.splice(index, 1);

  const sender = accounts.find((acc) => acc.login === reqObj.from);

  const reqToChange = sender.sentRequests.find(
    (req) => req.date === reqObj.date
  );

  reqToChange.status = 'Fullfilled';
}

export function declineRequest(user, reqObj, index) {
  user.incomingRequests.splice(index, 1);

  const sender = accounts.find((acc) => acc.login === reqObj.from);

  const reqToChange = sender.sentRequests.find(
    (req) => req.date === reqObj.date
  );

  reqToChange.status = 'Declined';
}
