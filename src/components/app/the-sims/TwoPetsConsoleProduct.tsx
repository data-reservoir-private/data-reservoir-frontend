import React from 'react';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsTwoPetsConsoleProductResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import Image from 'next/image';
import { SIMOLEON_ICON } from '@/utilities/char';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';

export default function TwoPetsConsoleProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-two-pets-console-product"],
    queryFn: async () => {
      const j = await request<TheSimsTwoPetsConsoleProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: TheSimsTwoPetsConsoleProductResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Price: SIMOLEON_ICON + " " + d.price,
        Description: d.description,
        Hunger: d.hunger,
        Energy: d.energy,
        Bladder: d.bladder,
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />;
}
