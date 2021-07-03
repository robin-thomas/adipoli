import Axios from 'axios';

import config from '../config/config.json';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getFlightsByRoute = async (from, to, date) => {
  const url = `${config.app.api.getFlightsByRoute}?from=${from}&to=${to}&date=${date}`;
  const request = await Axios({ url, method: 'get' });
  return request.data;
};

const getPremium = async (policyId, from, flight) => {
  const url = `${config.app.api.getPremium}?policyId=${policyId}&from=${from}&flight=${flight}`;

  while (true) {
    const premium = (await Axios({ url, method: 'get' })).data;

    if (isNaN(premium.premium) || premium.premium === 0) {
      await sleep(2000);
      continue;
    }

    return premium.premium;
  }
};

const getPolicy = async (policyId) => {
  const url = config.app.api.getPolicy.replace('{policyId}', policyId);

  try {
    while (true) {
      const policy = (await Axios({ url, method: 'get' })).data;

      if (policy && policy.owner === '0x0') {
        await sleep(2000);
        continue;
      }

      return policy;
    }
  } catch (err) {
    // Ignore.
  }
};

const createPolicy = async (policy) => {
  const url = config.app.api.createPolicy;
  return await Axios({ url, method: 'post', data: policy });
};

const withdraw = async (data) => {
  const url = config.app.api.withdraw;
  return await Axios({ url, method: 'post', data });
};

export { getFlightsByRoute };
export { getPremium };
export { getPolicy };
export { createPolicy };
export { withdraw };
