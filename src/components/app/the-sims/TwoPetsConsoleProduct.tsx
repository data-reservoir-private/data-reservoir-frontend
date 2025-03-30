import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsTwoPetsConsoleProductResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { SIMOLEON_ICON } from '@/utilities/char';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function TwoPetsConsoleProduct() {
  const queryResult = useQuery({
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
        Price: SIMOLEON_ICON + " " + d.price,
        Description: d.description,
        Hunger: d.hunger,
        Energy: d.energy,
        Bladder: d.bladder,
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGrid data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />
    </BasicWrapper>
  );
}
