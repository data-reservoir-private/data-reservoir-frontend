import BasicGridSSR from '@/components/common/basic-grid/BasicGridSSR';
import { TheSimsCastawayProductResponse } from '@/model/response/the-sims';
import { GetTheSimsData } from '@/service/the-sims'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Sims Castaway product - Birdeye View'
};

export default async function CastawayProductPage() {
  const data = await GetTheSimsData('castaway-product') as TheSimsCastawayProductResponse[];

  return (
    <div>
      <BasicGridSSR
        data={data}
        linkOnClick={d => `/the-sims/castaway-product/${d.id.toString()}`}
        imageSrc={x => x.image}
        imageAlt={x => x.name}
        gridImageClasses='rounded-sm'
      />
    </div>
  )
}
