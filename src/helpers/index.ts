import { isAddress } from '~/modules/utils/web3';

export function truncateMiddleOfAddress(address: string) {
  if (!isAddress(address)) {
    return address;
  }
  const strLen = address.length;
  return address.substring(0, 6) + '...' + address.substring(strLen - 4, strLen);
}
