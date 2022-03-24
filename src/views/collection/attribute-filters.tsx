import React from 'react';
import { useRouter } from 'next/router';
import { Accordion } from '@chakra-ui/react';
import { AttributeFilter } from './attribute-filter';
import trpc from '~/modules/trpc';

export const AttributeFilters: React.FC = () => {
  const {
    query: { collectionAddress },
  } = useRouter();
  const { data: traits } = trpc.useQuery(['vault.all-attributes', { collectionAddress: collectionAddress as string }]);
  return (
    <Accordion allowMultiple>
      {traits &&
        Object.entries(traits).map(([trait, values]) => <AttributeFilter key={trait} trait={trait} values={values} />)}
    </Accordion>
  );
};

export default AttributeFilters;
