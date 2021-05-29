import Axios from 'axios';
import CryptoJS from 'crypto-js';

const getHeaders = ({ method, url, data }) => {
  const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();

  const salt = CryptoJS.lib.WordArray.random(12);

  const secret = process.env.RAPYD_SECRET_KEY;

  let body = '';
  if (data && JSON.stringify(data) !== '{}') {
    body = JSON.stringify(data);
  }

  let toSign = method + url + salt + timestamp;
  toSign += process.env.RAPYD_ACCESS_KEY + secret + body;

  let signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(toSign, secret));
  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

  return {
    salt,
    signature,
    timestamp,
    access_key: process.env.RAPYD_ACCESS_KEY,
    'Content-Type': 'application/json',
  };
};

const makeRequest = async ({ method, url, data }) => {
  const headers = getHeaders({ method, url, data });

  let request;
  try {
    request = await Axios({
      baseURL: process.env.RAPYD_BASE_URL,
      url,
      method,
      headers,
      data,
    });

    return request.data;
  } catch (err) {
    throw new Error(err?.response?.data?.status?.error_code || 'HTTP_REQUEST_FAILED');
  }
};

export { makeRequest };
export { getHeaders };
