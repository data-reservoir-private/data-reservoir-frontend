import React from 'react'
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsFourPCHarvestableResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import { Checkbox } from 'flowbite-react';
import { SIMOLEON_ICON } from '@/utilities/char';

export default function FourPCHarvestable() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-four-pc-harvestable"],
    queryFn: async () => {
      let j = await request<TheSimsFourPCHarvestableResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: TheSimsFourPCHarvestableResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <Paper className='w-full flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Image src={d.image} width={256} height={256} alt={d.name} className='w-[50%] h-auto'/>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Description: d.description,
        Rarity: d.rarity,
        "Vertical Garden": <Checkbox checked={d.vertical_garden} size={8} disabled />,
        "Base Value": SIMOLEON_ICON + " " + d.base_value,
        "Perfect Value": SIMOLEON_ICON + " " + d.perfect_value,
        "Growth Rate": d.growth_rate,
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />
}
