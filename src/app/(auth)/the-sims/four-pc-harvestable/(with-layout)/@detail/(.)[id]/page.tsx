import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage'
import GridDetail from '@/components/common/basic-grid/GridDetail'
import { TheSimsFourPCHarvestableResponse } from '@/model/response/the-sims';
import { GetTheSimsDataByID } from '@/service/the-sims'
import { SIMOLEON_ICON } from '@/utilities/char';
import { Checkbox } from 'flowbite-react';
import React from 'react'

export default async function FourPCHarvestableDetailPage({params} : {params: Promise<{id: string}>}) {

  const { id } = await params;
  const d = (await GetTheSimsDataByID('four-pc-harvestable', id)) as TheSimsFourPCHarvestableResponse;
  return (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id.toString(),
        Name: d.name,
        Description: d.description,
        Rarity: d.rarity,
        "Vertical Garden": <Checkbox checked={d.vertical_garden} size={8} disabled />,
        "Base Value": SIMOLEON_ICON + " " + d.base_value,
        "Perfect Value": SIMOLEON_ICON + " " + d.perfect_value,
        "Growth Rate": d.growth_rate,
      }}/>
    </div>
  )
}
