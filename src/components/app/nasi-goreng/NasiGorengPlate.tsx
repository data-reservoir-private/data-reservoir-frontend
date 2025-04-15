import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengPlateResponse } from '@/model/response/nasi-goreng';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function NasiGorengPlate() {
  const queryResult = useQuery({
    queryKey: ['nasi-goreng-plate'],
    queryFn: async () => {
      const j = await request<NasiGorengPlateResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.PLATE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengPlateResponse) => (
    <div className='w-full gap-3 flex flex-col'>
      <BasicGridDetailImage src={d.image} width={256} height={256} alt={d.index.toString()} unoptimized/>
      <GridDetail data={{
        ID: d.id,
        Index: d.index,
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGridWithDetail data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.index.toString()} detail={displayDetail} gridContainerClasses='w-32 h-32' />
    </BasicWrapper>
  );
}
