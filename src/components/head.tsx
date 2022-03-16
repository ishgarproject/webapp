import React from 'react';
import NextHead from 'next/head';

export const Head: React.FC<{ title?: string; description?: string }> = ({ title, description }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
);

Head.defaultProps = {
  title: 'Ishgar',
  description: 'Ishgar: NFT Order book on Starknet',
};

export default Head;
