import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage'
import GridDetail from '@/components/common/basic-grid/GridDetail'
import { TheSimsTwoPetsConsoleProductResponse } from '@/model/response/the-sims';
import { GetTheSimsDataByID } from '@/service/the-sims'
import { SIMOLEON_ICON } from '@/utilities/char';
import React from 'react'

export default async function TwoPetsConsoleProductDetailPage({params} : {params: Promise<{id: string}>}) {

  const { id } = await params;
  const d = (await GetTheSimsDataByID('two-pets-console-product', id)) as TheSimsTwoPetsConsoleProductResponse;
  return (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id.toString(),
        Name: d.name,
        Category: d.category,
        Price: SIMOLEON_ICON + " " + d.price,
        Description: d.description,
        Hunger: d.hunger,
        Energy: d.energy,
        Bladder: d.bladder,
      }}/>
    </div>
  )
}
