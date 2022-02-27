import { ethers } from 'ethers';
import { ALCHEMY_API_KEY } from '~/constants/alchemy';

// TODO: add a way to specify network
export const web3Provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
