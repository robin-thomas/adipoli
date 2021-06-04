import { makeRequest } from './utils';

const Wallet = {
  createWallet: async (params) => {
    const data = {
      type: "person",
      email: params?.email || "",
      ewallet_reference_id: params?.email || Date.now().toString(),
    };

    const method = 'post';
    const url = '/v1/user';

    const response = await makeRequest({ method, url, data });

    return response.data.id;
  },

  transfer: async (params) => {
    const data = {
      amount: params.amount,
      currency: "USD",
      source_ewallet: params.sourceWalletId,
      destination_ewallet: params.destinationWalletId,
    };

    const method = 'post';
    const url = '/v1/account/transfer';

    const response = await makeRequest({ method, url, data });

    return response.data?.status?.status === 'SUCCESS';
  },

  topUp: async (params) => {
    const data = {
      amount: params.amount,
      currency: "USD",
      payment_method: params.card,
      capture: true,
      ewallets: [{
        ewallet: params.walletId,
        percentage: 100,
      }],
    };

    const method = 'post';
    const url = '/v1/payments';

    const response = await makeRequest({ method, url, data });
    console.log(response);

    return response.data?.status?.status === 'SUCCESS';
  },
};

export default Wallet;
