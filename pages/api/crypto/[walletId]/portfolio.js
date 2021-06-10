import * as yup from 'yup';

import config from '../../../../tokens.json';
import TransactionUtil from '../../../../utils/db/transaction';

const removeZeroValue = (tokens) =>
  Object.keys(tokens)
    .filter((k) => tokens[k] > 0)
    .reduce((p, k) => ({ ...p, [k]: tokens[k] }), {});

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

      const tokens = {};
      for (const token of Object.keys(config)) {
        tokens[token] = 0;
      }

      const resp = await TransactionUtil.getTransactions(req.query.walletId);
      const balances = resp
        .map((t) => ({
          ...t,
          created: new Date(t.created).toISOString().substr(0, 10),
        }))
        .reduce((p, t) => {
          if (t.type === 'BUY') {
            tokens[t.token.id] += t.token.amount;
          } else if (t.type === 'SELL') {
            tokens[t.token.id] -= t.token.amount;
          }

          p[t.created] = { tokens: removeZeroValue(tokens), prices: t.prices };

          return p;
        }, {});

      const portfolio = Object.keys(balances).reduce((p, date) => {
        const { tokens: _tokens, prices: _prices } = balances[date];

        let _val = 0;
        for (const _token of Object.keys(_tokens)) {
          _val += _tokens[_token] * _prices[config[_token].id];
        }

        return { ...p, [date]: parseFloat(_val.toFixed(2)) };
      }, {});

      res.status(200).json({ statusCode: 200, success: true, portfolio });
    } catch (err) {
      console.error(err);
      res.status(400).json({ statusCode: 400, error: err.message });
    }
  } else {
    res.status(404).json();
  }
}

export default handler;
