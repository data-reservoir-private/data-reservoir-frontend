import BasicGridSSR from '@/components/common/basic-grid/BasicGridSSR';
import { TheSimsTwoPetsConsoleProductResponse } from '@/model/response/the-sims';
import { GetTheSimsData } from '@/service/the-sims'
import React from 'react'

export default async function TwoPetsConsoleProductPage() {
  const data = await GetTheSimsData('two-pets-console-product') as TheSimsTwoPetsConsoleProductResponse[];

  return (
    <div>
      <BasicGridSSR
        data={data}
        linkOnClick={d => `/the-sims-new/two-pets-console-product/${d.id.toString()}`}
        imageSrc={x => x.image}
        imageAlt={x => x.name}
        gridImageClasses='rounded-sm'
      />
    </div>
  )
}
