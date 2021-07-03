import { makeRequest } from './utils';

import config from '../../config/tokens.json';

const Price = {
  getPrices: async (tokenIds = Object.values(config).map((e) => e.id)) => {
    const prices = await makeRequest({
      method: 'get',
      url: '/price',
      params: {
        vs_currencies: 'usd',
        ids: tokenIds.join(','),
      },
    });

    return prices;
  },

  getPortfolioBalance: async (tokens, prices = null) => {
    const tokenIds = Object.keys(tokens).map((t) => config[t].id);

    if (!prices) {
      prices = await Price.getPrices(tokenIds);
    }

    const balance = Object.keys(tokens).reduce((p, t) => {
      const tokenId = config[t].id;
      return p + tokens[t] * parseFloat(prices[tokenId].usd);
    }, 0);

    return balance.toFixed(2);
  },
};

export default Price;
