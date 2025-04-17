import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsCastawayProductResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';
import SimpleCheckbox from '@/components/common/form/SimpleCheckbox';

export default function CastawayProduct() {
  const queryResult = useQuery({
    queryKey: ["the-sims-castaway-product"],
    queryFn: async () => {
      const j = await request<TheSimsCastawayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: TheSimsCastawayProductResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
        Description: d.description,
        Hunger: d.hunger,
        Energy: d.energy,
        Bladder: d.bladder,
        "Eaten Raw": <SimpleCheckbox checked={d.eaten_raw} disabled />,
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGridWithDetail data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />
    </BasicWrapper>
  );
}
