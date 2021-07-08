import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';

import config from '../config/config.json';
import contract from '../truffle/_build/contracts/Adipoli.json';

const Contract = {
  getWeb3Provider: () => {
    return new HDWalletProvider(
      process.env.METAMASK_MNEMONIC,
      process.env.INFURA_API_KEY
    );
  },

  getWeb3: (provider = null) => {
    if (provider === null) {
      provider = Contract.getWeb3Provider();
    }

    return new Web3(provider);
  },

  getContract: (provider) => {
    const web3 = Contract.getWeb3(provider);

    return new web3.eth.Contract(
      contract.abi,
      contract.networks[config.app.network.network_id].address
    );
  },

  // This function is used to invoke a function in the smart contract.
  // isPure will be set for functions that do not change state.
  // ...args are passed to the contract function.
  invokeFn: async (fnName, isPure, ...args) => {
    const _provider = Contract.getWeb3Provider();
    const _web3 = Contract.getWeb3(_provider);
    const _contract = Contract.getContract(_provider);

    try {
      const _fn = _contract.methods[fnName](...args);
      if (isPure) {
        const [account] = await _web3.eth.getAccounts();

        // Need to set "from" because we are using "msg.sender" in the contract.
        return await _fn.call({ from: account });
      } else {
        return await Contract.sendSignedTx(_web3, _fn);
      }
    } catch (err) {
      throw err;
    }
  },

  sendSignedTx: async (web3, fn) => {
    try {
      const [account] = await web3.eth.getAccounts();

      const tx = {
        from: account,
        to: contract.networks[config.app.network.network_id].address,
        data: fn.encodeABI(),
        gas: 10000000,
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'Gwei')),
      };

      const signedTx = await web3.eth.signTransaction(tx, tx.from);
      return await web3.eth.sendSignedTransaction(signedTx.raw);
    } catch (err) {
      throw err;
    }
  },

  getTx: async (txHash) => {
    const _provider = await Contract.getWeb3Provider();
    const _web3 = Contract.getWeb3(_provider);

    // Wait till the transaction is mined.
    let receipt = null;
    while (true) {
      receipt = await _web3.eth.getTransactionReceipt(txHash);
      if (receipt !== null) {
        break;
      }

      await Contract.sleep(1000 /* 1s */);
    }

    try {
      if (receipt.status === true) {
        // Return tx details.
        return await _web3.eth.getTransaction(txHash);
      }

      throw new Error(`Transaction ${txHash} has failed`);
    } catch (err) {
      throw err;
    }
  },

  // sleep for given ms milliseconds.
  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Contract;
