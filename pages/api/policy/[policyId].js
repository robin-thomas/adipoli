import Contract from '../../../utils/contract';
import withCache from '../../../utils/middleware/cache';

const mapPolicyToObject = (policy) => ({
  policyId: policy[0],
  owner: policy[1],
  date: policy[2],
  products: policy[3],
  flight: {
    from: policy[4][0],
    to: policy[4][1],
    code: policy[4][2],
    name: policy[4][3],
    departureTime: policy[4][4],
    arrivalTime: policy[4][5],
  },
  premium: {
    paid: policy[5][0],
    amount: parseFloat(Contract.getWeb3().utils.fromWei(policy[5][1])),
    txHash: policy[5][2],
  },
  payment: {
    paid: policy[6][0],
    amount: parseFloat(Contract.getWeb3().utils.fromWei(policy[6][1])),
    txHash: policy[6][2],
  },
});

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const policyId = req.query.policyId;

      const cacheKey = `policy-${policyId}`;
      if (req.cache.has(cacheKey)) {
        return res.status(200).json(req.cache.get(cacheKey));
      }

      const policy = await Contract.invokeFn('getPolicy', true, policyId);

      // Policy doesnt exist.
      if (policy.policyId === '0') {
        res.status(404).send();
      } else {
        res.status(200).send(mapPolicyToObject(policy));
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCache(handler);
