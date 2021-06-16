const account1 = {
  owner: 'Jonas Schmedtmann',
  login: 'jonas',
  pin: 1111,
  interestRate: 1.2,
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  incomingRequests: [],
  sentRequests: [
    {
      to: 'jess',
      amount: 1000,
      currency: 'EUR',
      date: '2021-06-12T12:01:20.894Z',
      status: 'Sent',
    },
    {
      to: 'jess',
      amount: 1000,
      currency: 'EUR',
      date: '2021-06-12T12:01:25.894Z',
      status: 'Sent',
    },
    {
      to: 'jess',
      amount: 4500,
      currency: 'EUR',
      date: '2020-06-12T12:01:25.894Z',
      status: 'Declined',
    },
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  login: 'jess',
  pin: 2222,
  interestRate: 1.5,
  movements: [5000, -150, -790, -1000, 8500, -30],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  incomingRequests: [
    {
      from: 'jonas',
      amount: 1211.65,
      currency: 'EUR',
      date: '2021-06-12T12:01:20.894Z',
    },
    {
      from: 'jonas',
      amount: 1211.65,
      currency: 'EUR',
      date: '2021-06-12T12:01:25.894Z',
    },
  ],
  sentRequests: [
    {
      to: 'jonas',
      amount: 1000,
      currency: 'USD',
      date: '2020-05-08T14:11:59.604Z',
      status: 'Fullfilled',
    },
    {
      to: 'jonas',
      amount: 5000,
      currency: 'USD',
      date: '2020-06-12T14:11:59.604Z',
      status: 'Declined',
    },
  ],
  currency: 'USD',
  locale: 'en-US',
};

export default [account1, account2];
