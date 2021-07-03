import Contract from '../../../utils/contract';
import withCache from '../../../utils/middleware/cache';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!req.cache.has(req.query.policyId)) {
        // Trigger the function to calculate the premium.
        Contract.invokeFn(
          'calculatePremium',
          false /* isPure */,
          req.query.policyId,
          req.query.from,
          req.query.flight
        ).then(console.error);

        req.cache.set(req.query.policyId, true);
      }

      // Retrieve the premium value if already calculated.
      // If not, the client-side needs to keep triggering this api,
      // as all apis have a 10 seconds timeout.
      let premium = await Contract.invokeFn(
        'getPremium',
        true /* isPure */,
        req.query.policyId
      );

      if (!isNaN(premium) && premium >= 1) {
        premium = (100.0 - premium) / 100.0;
      } else {
        premium = 0;
      }

      res.status(200).json({ premium });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCache(handler);
