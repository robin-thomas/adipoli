import Axios from 'axios';

const makeRequest = async ({ method, url, params }) => {
  const request = await Axios({
    baseURL: process.env.COINGECKO_BASE_URL,
    url,
    method,
    params,
  });

  return request.data;
};

export { makeRequest };
