import { makeRequest } from './utils';

const Wallet = {
  createWallet: async (params) => {
    const data = {
      type: 'person',
      email: params?.email || '',
      ewallet_reference_id: params?.email || Date.now().toString(),
    };

    const method = 'post';
    const url = '/v1/user';

    const response = await makeRequest({ method, url, data });

    return response.data.id;
  },

  getBalance: async (walletId) => {
    const method = 'get';
    const url = `/v1/user/${walletId}/accounts`;

    const response = await makeRequest({ method, url, data: null });

    if (response?.status?.status === 'SUCCESS') {
      const balance = response.data
        .filter((e) => e.currency === 'USD')
        .map((e) => e.balance);

      return balance.length === 1 ? balance[0] : 0;
    }

    throw new Error(response.status.error_code ?? 'Failed');
  },

  completeTransfer: async (id) => {
    const data = {
      id,
      status: 'accept',
    };

    const method = 'post';
    const url = '/v1/account/transfer/response';

    return await makeRequest({ method, url, data });
  },

  transfer: async (params) => {
    try {
      const data = {
        amount: params.amount,
        currency: 'USD',
        source_ewallet: params.sourceWalletId,
        destination_ewallet: params.destinationWalletId,
      };

      const method = 'post';
      const url = '/v1/account/transfer';

      const resp = await makeRequest({ method, url, data });

      if (resp?.data?.status === 'PEN') {
        return await Wallet.completeTransfer(resp.data.id);
      }

      return resp;
    } catch (err) {
      throw err;
    }
  },

  topUp: async (params) => {
    const data = {
      amount: params.amount,
      currency: 'USD',
      payment_method: params.card,
      capture: true,
      ewallets: [
        {
          ewallet: params.walletId,
          percentage: 100,
        },
      ],
    };

    const method = 'post';
    const url = '/v1/payments';

    const response = await makeRequest({ method, url, data });

    return response.data?.status?.status === 'SUCCESS';
  },

  getTransactions: async (walletId) => {
    const method = 'get';
    const url = `/v1/user/${walletId}/transactions`;

    const response = await makeRequest({ method, url, data: null });

    if (response?.status?.status === 'SUCCESS') {
      return response.data;
    }

    throw new Error(response.status.error_code ?? 'Failed');
  },

  requestPayment: async (params) => {
    const data = {
      amount: params.amount,
      country: 'US',
      currency: 'USD',
      ewallets: [
        {
          ewallet: params.walletId,
          percentage: 100,
        },
      ],
    };

    const method = 'post';
    const url = '/v1/checkout';

    const response = await makeRequest({ method, url, data });

    return response?.data?.redirect_url;
  },
};

export default Wallet;
