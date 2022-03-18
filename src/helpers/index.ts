import { isAddress } from '~/modules/utils/web3';

export function truncateMiddleOfAddress(address?: string) {
  if (!address || !isAddress(address)) {
    return address;
  }
  const strLen = address.length;
  return address.substring(0, 6) + '...' + address.substring(strLen - 4, strLen);
}

export function getFirstCharactersOfHash(hash: string, numberOfChars = 6) {
  let startIndex = 0;
  if (has0xPrefix(hash)) startIndex = 2;
  return hash.substring(startIndex, startIndex + numberOfChars);
}

function has0xPrefix(str: string) {
  return str.startsWith('0x');
}
