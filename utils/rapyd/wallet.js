import { makeRequest } from './utils';

const Wallet = {
  createWallet: async (params) => {
    const data = {
      "type": "person",
      "email": params?.email || "",
      "ewallet_reference_id": params?.email || Date.now().toString(),
    };

    const method = 'post';
    const url = '/v1/user';

    const response = await makeRequest({ method, url, data });

    return response.data.id;
  },
};

export default Wallet;
