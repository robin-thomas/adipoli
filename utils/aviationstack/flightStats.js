import Axios from 'axios';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import differenceInDays from 'date-fns/differenceInDays';

import config from '../../config/config.json';

const getFlightStatus = async (cache, from, to, code, date) => {
  const parsedDate = parseISO(date);
  const cacheKey = `${from}-${to}-${code}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  if (
    isBefore(parsedDate, new Date()) &&
    differenceInDays(new Date(), parsedDate) > 6
  ) {
    throw new Error('Date interval should be within 7 days!');
  }

  if (
    isBefore(new Date(), parsedDate) &&
    differenceInDays(parsedDate, new Date()) > 6
  ) {
    throw new Error('Date interval should be within 7 days!');
  }

  const url = config.aviationstack.api.getFlight
    .replace('{from}', from)
    .replace('{to}', to)
    .replace('{code}', code)
    .replace('{appKey}', process.env.AVIATIONSTACK_APPKEY);

  const resp = (await Axios({ url, method: 'get' })).data.data[0];
  const data = {
    departureGateDelayMinutes: resp.departure.delay,
    arrivalGateDelayMinutes: resp.arrival.delay,
    cancelled: resp.flight_status === 'cancelled',
  };

  cache.set(cacheKey, data);

  return data;
};

export { getFlightStatus };
