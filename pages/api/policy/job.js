import format from 'date-fns/format';
import endOfYesterday from 'date-fns/endOfYesterday';

import Contract from '../../../utils/contract';
import withCache from '../../../utils/middleware/cache';
import { calculatePayment } from '../../../utils/policy';
import WalletUtils from '../../../utils/rapyd/wallet';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schedulerKey = req.headers.authorization.split(' ')[1];
      if (schedulerKey !== process.env.SCHEDULER_KEY) {
        return res.status(404).send();
      }

      res.status(200).send();

      const date = format(endOfYesterday(), 'yyyy-MM-dd');

      const policies = await Contract.invokeFn(
        'getUnpaidPolicies',
        true /* isPure */,
        date
      );

      if (policies.length === 0) {
        return;
      }

      for (const policy of policies) {
        // Calculate the payment to be paid.
        const payment = await calculatePayment(req.cache, policy);

        // Pay the policy owner.
        if (!payment.isNaN(payment) && payment > 0) {
          await WalletUtils.transfer({
            amount: payment,
            sourceWalletId: process.env.APP_WALLET_ID,
            destinationWalletId: policy.owner,
          });

          await Contract.invokeFn(
            'payPolicy',
            false /* isPure */,
            policy.policyId,
            payment
          );
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default withCache(handler);
