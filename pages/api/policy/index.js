import Contract from '../../../utils/contract';
import withCache from '../../../utils/middleware/cache';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const policy = {
        ...req.body,
        premium: {
          paid: true,
          amount: req.body.premium.amount,
          txHash: '',
        },
        payment: {
          paid: false,
          amount: 0,
          txHash: '',
        },
      };

      const forCache = { ...policy };
      forCache.owner = '0x0';

      const cacheKey = `policy-${policy.policyId}`;
      req.cache.set(cacheKey, forCache);

      res.status(200).send();

      await Contract.invokeFn('createNewPolicy', false /* isPure */, policy);
      req.cache.del(cacheKey);
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCache(handler);
