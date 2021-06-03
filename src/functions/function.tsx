import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

export const dateToString = (dt: any) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2)
  );
};

/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const datetimeToString = (dt: any) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2) +
    ' ' +
    ('00' + dt.getHours()).slice(-2) +
    ':' +
    ('00' + dt.getMinutes()).slice(-2) +
    ':' +
    ('00' + dt.getSeconds()).slice(-2)
  );
};
