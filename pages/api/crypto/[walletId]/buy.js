import * as yup from 'yup';

import WalletUtil from '../../../../utils/rapyd/wallet';
import CryptoUtil from '../../../../utils/db/crypto';
import TransactionUtil from '../../../../utils/db/transaction';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
        tokenId: yup.string().required(),
        amount: yup.number().required(),
        price: yup.number().required(),
      });

      const params = { ...req.query, ...req.body };

      try {
        await schema.isValid(params);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      // Transfer <Amount> from user wallet to client wallet.
      await WalletUtil.transfer({
        amount: parseInt(params.amount),
        sourceWalletId: params.walletId,
        destinationWalletId: process.env.APP_WALLET_ID,
      });

      const amount = (parseFloat(params.amount) / params.price).toFixed(5);

      const body = {
        token: {
          id: params.tokenId,
          amount: parseFloat(amount),
          price: params.price,
        },
        amount: parseFloat(params.amount),
        type: 'BUY',
        walletId: params.walletId,
      };

      // Add a transaction.
      await TransactionUtil.createTransaction(body);

      // Update the crypto balance.
      await CryptoUtil.updateBalance(body);

      res.status(200).json({ statusCode: 200, success: true });
    } catch (err) {
      let message = err.message;
      if (message === 'INVALID_TRANSFER_DETAILS') {
        message = 'NOT_ENOUGH_FUNDS';
      }

      res.status(400).json({ statusCode: 400, error: message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
