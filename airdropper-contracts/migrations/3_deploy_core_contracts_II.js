const {getAccountAddress} = require('@blockrocket/utils');

const MNEMONIC = process.env.PROTOTYPE_BR_KEY || '';
const INFURA_KEY = process.env.PROTOTYPE_BR_INFURA_KEY || '';

const AccessWhitelist = artifacts.require('AccessWhitelist');
const CommissionSplitter = artifacts.require('CommissionSplitter');
const ERC20Airdropper = artifacts.require('ERC20Airdropper');

module.exports = async function (deployer, network, accounts) {
    console.log('Deploying core contracts to network: ' + network);

    const creator = getAccountAddress(accounts, 0, network, MNEMONIC, INFURA_KEY);

    const platform = '0x54BFB3a5E2e5999B9E2fd63def9750CA667Adc5B';
    const platformSplit = '50';

    const partner = '0x33ec4a84D94AdEA5dE449FEAB2feA918e2Ded849';
    const partnerSplit = '50';

    // await deployer.deploy(AccessWhitelist, {from: creator});
    const accessWhitelist = await AccessWhitelist.deployed();
    console.log('accessWhitelist.address', accessWhitelist.address);

    await deployer.deploy(CommissionSplitter,
        accessWhitelist.address,
        platform,
        platformSplit,
        partner,
        partnerSplit,
        {from: creator}
    );
    const splitter = await CommissionSplitter.deployed();
    console.log('splitter.address', splitter.address);

    await deployer.deploy(ERC20Airdropper, accessWhitelist.address, splitter.address, {from: creator});
    const airdropper = await ERC20Airdropper.deployed();
    console.log('airdropper.address', airdropper.address);

    console.log('successful!');
};
