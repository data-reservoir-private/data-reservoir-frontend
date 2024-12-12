import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import { CygnusNodeResponse } from '@/model/response/cygnus';
import Image from 'next/image';

export default function CygnusNode() {
  const { isLoading, data } = useQuery({
    queryKey: ['cygnus-node'],
    queryFn: async () => {
      const j = await request<CygnusNodeResponse[], {}>({
        method: "GET",
        url: API_ROUTE.CYGNUS.NODE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: CygnusNodeResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image[0]} alt={d.name} className='rendering-pixelated' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Contains: d.contains,
        Images: (
          <div className='flex justify-between'>
            {
              d.image.map((x, idx) => (
                <Image src={x} key={d.name + idx.toString()} alt={d.name + idx.toString()} width={0} height={0} objectFit='contain' className='w-8 h-8'/>
              ))
            }
          </div>
        ),
        "Location in Mines": d.location_mines,
        "Other Location": d.location_other
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image[0]} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
}
