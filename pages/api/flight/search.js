import Axios from 'axios';

import withCache from '../../../utils/middleware/cache';
import config from '../../../config/config.json';
import airlines from '../../../config/airlines.json';

const getRoutes = async (req) => {
  const url = config.aviationstack.api.getFlightsByRoute
    .replace('{from}', req.query.from)
    .replace('{to}', req.query.to)
    .replace('{appKey}', process.env.AVIATIONSTACK_APPKEY);

  const response = await Axios({
    baseURL: process.env.AVIATIONSTACK_BASE_URL,
    method: 'get',
    url,
  });

  const { data } = response;
  return data;
};

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cacheKey = `route-${req.query.from}-${req.query.to}`;

      if (!req.cache.has(cacheKey)) {
        const resp = await getRoutes(req);
        req.cache.set(cacheKey, resp);
      }

      const data = req.cache.get(cacheKey);
      if (!data?.data) {
        return res.status(500).json(data);
      }

      const date = new Date().toISOString().substr(0, 10);
      const flights = data.data.filter((flight) => flight.flight_date === date);

      const delays = {};
      const results = [];

      for (const flight of flights) {
        const dep = flight.departure.scheduled.substr(10);
        const departureTime = `${req.query.date}${dep}`;
        const depDate = new Date(departureTime);

        const arr = flight.arrival.scheduled.substr(10);
        let arrivalTime = `${req.query.date}${arr}`;
        const arrDate = new Date(arrivalTime);

        if (depDate > arrDate) {
          arrDate.setDate(arrDate.getDate() + 1);
          arrivalTime = `${arrDate.getUTCFullYear()}-${
            arrDate.getMonth() + 1
          }-${arrDate.getDay()}${dep}`;
        }

        if (!delays[flight.flight.iata]) {
          delays[flight.flight.iata] = {};
        }
        delays[flight.flight.iata][flight.flight_date] =
          flight.departure.delay + flight.arrival.delay;

        results.push({
          name: airlines[flight.airline.iata] ?? flight.airline.name,
          code: flight.flight.iata,
          departureTime,
          arrivalTime,
        });
      }

      if (!req.cache.has('delay')) {
        req.cache.set('delay', delays);
      }

      res.status(200).json(results);
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCache(handler);
