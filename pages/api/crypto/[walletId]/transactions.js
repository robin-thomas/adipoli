import * as yup from 'yup';

import TransactionUtil from '../../../../utils/db/transaction';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const schema = yup.object().shape({
        walletId: yup.string().required(),
      });

      try {
        await schema.isValid(req.query);
      } catch (err) {
        throw new Error('Required fields missing or invalid in request');
      }

      const resp = await TransactionUtil.getTransactions(req.query.walletId);
      const transactions = resp
        .map((e) => ({
          id: `${
            e.token.amount
          } ${e.token.id.toUpperCase()} @ $${e.token.price.toLocaleString()}/${e.token.id.toUpperCase()}`,
          created_at: new Date(e.created).getTime() / 1000,
          type: e.type,
          amount: parseFloat(`${e.type === 'BUY' ? '-' : ''}${e.amount}`),
        }))
        .reverse();

      res.status(200).json({ statusCode: 200, success: true, transactions });
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
