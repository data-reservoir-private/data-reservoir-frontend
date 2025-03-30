import BasicGridSSR from '@/components/common/basic-grid/BasicGridSSR';
import { TheSimsFourPCHarvestableResponse } from '@/model/response/the-sims';
import { GetTheSimsData } from '@/service/the-sims'
import React from 'react'

export default async function FourPCHarvestablePage() {
  const data = await GetTheSimsData('four-pc-harvestable') as TheSimsFourPCHarvestableResponse[];

  return (
    <div>
      <BasicGridSSR
        data={data}
        linkOnClick={d => `/the-sims/four-pc-harvestable/${d.id.toString()}`}
        imageSrc={x => x.image}
        imageAlt={x => x.name}
        gridImageClasses='rounded-sm'
      />
    </div>
  )
}
