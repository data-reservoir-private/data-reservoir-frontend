import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengRelicResponse } from '@/model/response/nasi-goreng';
import Image from 'next/image';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';

export default function NasiGorengRelic() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-Relic'],
    queryFn: async () => {
      const j = await request<NasiGorengRelicResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.RELIC,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengRelicResponse) => (
    <div className='w-full gap-3 flex flex-col'>
      <BasicGridDetailImage src={d.image} width={256} height={256} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Tool: d.tool ? (
          <>
            <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
            <div className='relative min-h-6 w-6'>
              <Image src={d.tool.tool_image} alt={d.tool.tool_name} fill objectFit='contain' />
            </div>
              <span>{d.tool.tool_name}</span>
            </div>
          </>
        ) : "-"
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridContainerClasses='w-24 h-24' />;
}
