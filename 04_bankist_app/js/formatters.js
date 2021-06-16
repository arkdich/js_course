export function formatDate(locale, currDate) {
  const date = currDate.getDate();
  const month = currDate.getMonth() + 1;
  const year = currDate.getFullYear();

  let dateStr;

  const dateAndMonth = [
    date < 10 ? `0${date}` : date,
    month + 1 < 10 ? `0${month}` : month,
  ];

  if (locale !== 'en-US') {
    dateStr = `${dateAndMonth[0]}/${dateAndMonth[1]}`;
  } else {
    dateStr = `${dateAndMonth[1]}/${dateAndMonth[0]}`;
  }

  dateStr += `/${year}`;

  return dateStr;
}

export function formatTime(locale, date) {
  const dateHours = date.getHours();
  const dateMins = date.getMinutes();

  let timeStr =
    locale !== 'en-US'
      ? `${dateHours < 10 ? `0${dateHours}` : dateHours}`
      : `${dateHours % 12}`;

  timeStr += `:${dateMins < 10 ? `0${dateMins}` : dateMins}`;

  if (locale === 'en-US') {
    timeStr += dateHours < 12 ? ' AM' : ' PM';
  }

  return timeStr;
}

export function formatCurrency(currency, sum) {
  if (currency === 'USD') {
    return sum > 0 ? `$${sum.toFixed(2)}` : `-$${Math.abs(sum).toFixed(2)}`;
  }

  return `${sum.toFixed(2)}€`;
}

export async function convertCurrency(amount, from) {
  const API_URL =
    'https://openexchangerates.org/api/latest.json?app_id=e879d3cc2b214bc38c15d990ab264302';
  const req = await fetch(API_URL);
  const date = await req.json();

  const convRate = date.rates.EUR;

  const converted = from === 'USD' ? amount * convRate : amount / convRate;

  return converted;
}

export function getTotalBalance(movements) {
  return movements.reduce((prev, curr) => prev + curr);
}

export function getStatusStyle(status) {
  switch (status) {
    case 'Fullfilled':
      return 'bg-green';
    case 'Declined':
      return 'bg-red';
    default:
      return '';
  }
}
