import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import { CygnusArtifactResponse } from '@/model/response/cygnus';

export default function CygnusArtifact() {
  const { isLoading, data } = useQuery({
    queryKey: ['cygnus-artifact'],
    queryFn: async () => {
      const j = await request<CygnusArtifactResponse[], {}>({
        method: "GET",
        url: API_ROUTE.CYGNUS.ARTIFACT,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: CygnusArtifactResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Price: d.price,
        Description: d.description
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
}
