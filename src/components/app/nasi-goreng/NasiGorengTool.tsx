import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { NasiGorengToolResponse } from '@/model/response/nasi-goreng';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import Error from '@/components/common/error/Error';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function NasiGorengTool() {
  const queryResult = useQuery({
    queryKey: ['nasi-goreng-tool'],
    queryFn: async () => {
      const j = await request<NasiGorengToolResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.TOOL,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengToolResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} width={256} height={256} alt={d.name}/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Price: d.price,
        "Short Description": d.short_description,
        "Long Description": d.long_description
      }} />
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGridWithDetail data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridContainerClasses='w-24 h-24' />
    </BasicWrapper>
  );
}
