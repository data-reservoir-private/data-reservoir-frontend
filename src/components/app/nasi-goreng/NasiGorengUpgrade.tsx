import React from 'react';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengUpgradeResponse } from '@/model/response/nasi-goreng';
import Image from 'next/image';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';

export default function NasiGorengUpgrade() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-Upgrade'],
    queryFn: async () => {
      const j = await request<NasiGorengUpgradeResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.UPGRADE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengUpgradeResponse) => (
    <div className='w-full gap-3 flex flex-col'>
      <BasicGridDetailImage src={d.image} width={256} height={256} alt={d.name} unoptimized/>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridContainerClasses='w-20 h-20' />;
}
