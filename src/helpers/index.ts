import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { isAddress } from '~/modules/utils/web3';
import type { RawAttribute } from '~/modules/types';

export function getAllTraitsFromTokens(tokens: { attributes: Prisma.JsonValue }[]) {
  // const traits: Record<string, Record<string, boolean>> = {}
  return tokens?.reduce((acc, { attributes }) => {
    const rawAttributes = attributes as RawAttribute[];
    const traits = extractTraitsFromRawAttributes(rawAttributes);
    return _.merge(acc, traits);
  }, {} as Record<string, Record<string, boolean>>);
}

function extractTraitsFromRawAttributes(rawAttributes: RawAttribute[]) {
  return rawAttributes.reduce((acc, { trait_type, value }) => {
    if (!acc[trait_type]) {
      return { ...acc, [trait_type]: { [value]: true } };
    }
    acc[trait_type][value] = true;
    return acc;
  }, {} as Record<string, Record<string, boolean>>);
}

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
