export function formatDate(locale, currDate) {
  return Intl.DateTimeFormat(locale, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(currDate);
}

export function formatDateAndTime(locale, date) {
  return Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatCurrency({ locale, currency }, value) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
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
