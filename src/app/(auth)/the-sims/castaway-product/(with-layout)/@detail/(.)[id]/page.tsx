import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage'
import GridDetail from '@/components/common/basic-grid/GridDetail'
import SimpleCheckbox from '@/components/common/form/SimpleCheckbox';
import { TheSimsCastawayProductResponse } from '@/model/response/the-sims';
import { GetTheSimsDataByID } from '@/service/the-sims'
import Link from 'next/link';
import React from 'react'

export default async function CastawayProductDetailPage({params} : {params: Promise<{id: string}>}) {

  const { id } = await params;
  const d = (await GetTheSimsDataByID('castaway-product', id)) as TheSimsCastawayProductResponse;
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
        Description: d.description,
        Hunger: d.hunger,
        Energy: d.energy,
        Bladder: d.bladder,
        "Eaten Raw": <SimpleCheckbox checked={d.eaten_raw} disabled />,
      }} />
    </div>
  )
}
