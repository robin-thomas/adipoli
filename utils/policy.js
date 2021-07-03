import { getFlightStatus } from './aviationstack/flight';
import config from '../config/config.json';

const calculatePayment = async (cache, policy) => {
  try {
    // get the flight status.
    const status = await getFlightStatus(
      cache,
      policy.flight.from,
      policy.flight.to,
      policy.flight.code,
      policy.flight.departureTime
    );

    if (!status) {
      throw new Error('Unable to find flight status!');
    }

    let delay = 0;
    let cancelled = false;
    for (const product of policy.products) {
      switch (product) {
        case 'Flight Departure Delay':
          delay += isNaN(status.departureGateDelayMinutes)
            ? 0
            : status.departureGateDelayMinutes;
          break;

        case 'Flight Arrival Delay':
          delay += isNaN(status.arrivalGateDelayMinutes)
            ? 0
            : status.arrivalGateDelayMinutes;
          break;

        case 'Flight Cancellation':
          cancelled = status.cancelled === true;
          break;

        default:
          break;
      }
    }

    if (cancelled === true) {
      return config.app.payment.cancelled;
    }

    // First X minutes get paid at rate Ra.
    // Next Y minutes get paid at rate Rb.
    // Next Z minutes get paid at rate Rc, and so on.
    let slabs = Object.keys(config.app.payment.delay)
      .map((e) => Number(e))
      .sort((a, b) => a - b);

    let payment = 0;
    let slabIndex = 0;

    while (delay > 0) {
      if (delay > slabs[slabIndex]) {
        payment +=
          slabs[slabIndex] * config.app.payment.delay[slabs[slabIndex]];
        delay -= slabs[slabIndex];
        slabIndex++;
      } else {
        payment += delay * config.app.payment.delay[slabs[slabIndex]];
        delay = 0;
      }

      // Max payment is set to the cancellation rate.
      if (slabIndex > slabs.length) {
        payment = config.app.payment.cancelled;
        break;
      }
    }

    return payment;
  } catch (err) {
    throw err;
  }
};

export { calculatePayment };
