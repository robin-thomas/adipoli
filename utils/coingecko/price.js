import { makeRequest } from './utils';

import config from '../../tokens.json';

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

  getPortfolioBalance: async (tokens) => {
    const tokenIds = tokens.map((token) => config[token.id].id);
    const prices = await Price.getPrices(tokenIds);

    return tokens.reduce((p, token) => {
      const tokenId = config[token.id].id;
      return p + token.amount * parseFloat(prices[tokenId].usd);
    }, 0);
  },
};

export default Price;
