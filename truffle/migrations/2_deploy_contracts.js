const Adipoli = artifacts.require('Adipoli'); // eslint-disable-line

module.exports = (deployer, network) => {
  deployer.deploy(Adipoli);
};
