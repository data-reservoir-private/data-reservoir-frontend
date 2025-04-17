import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsFourPCHarvestableResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import { SIMOLEON_ICON } from '@/utilities/char';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';
import SimpleCheckbox from '@/components/common/form/SimpleCheckbox';

export default function FourPCHarvestable() {
  const queryResult = useQuery({
    queryKey: ["the-sims-four-pc-harvestable"],
    queryFn: async () => {
      const j = await request<TheSimsFourPCHarvestableResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: TheSimsFourPCHarvestableResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Description: d.description,
        Rarity: d.rarity,
        "Vertical Garden": <SimpleCheckbox checked={d.vertical_garden} disabled />,
        "Base Value": SIMOLEON_ICON + " " + d.base_value,
        "Perfect Value": SIMOLEON_ICON + " " + d.perfect_value,
        "Growth Rate": d.growth_rate,
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGridWithDetail data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />
    </BasicWrapper>
  );
}
