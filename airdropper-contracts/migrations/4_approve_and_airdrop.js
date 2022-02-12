const {getAccountAddress} = require('@blockrocket/utils');

const MNEMONIC = process.env.PROTOTYPE_BR_KEY || '';
const INFURA_KEY = process.env.PROTOTYPE_BR_INFURA_KEY || '';

const ShitCoinToken = artifacts.require('ShitCoinToken');
const ERC20Airdropper = artifacts.require('ERC20Airdropper');

module.exports = async function (deployer, network, accounts) {
    console.log('Deploying core contracts to network: ' + network);

    const creator = getAccountAddress(accounts, 0, network, MNEMONIC, INFURA_KEY);

    const heyCoin = await ShitCoinToken.deployed();
    console.log('HeyCoin', heyCoin.address);

    const airdropper = await ERC20Airdropper.deployed();
    console.log('ERC20Airdropper', airdropper.address);

    await heyCoin.approve(this.airdropper.address, "100000000000000000000000000", {from: creator});

    const platform = '0x818Ff73A5d881C27A945bE944973156C01141232';
    const partner = '0x8e8b5122b7a4E2A060D4d4434CdA2Af5DEcC651a';

    await airdropper.transfer(
      heyCoin.address,
      [platform, partner],
      ["50000000000000000000000000", "50000000000000000000000000"],
      {from: creator}
    );

    console.log('successful!');
};
