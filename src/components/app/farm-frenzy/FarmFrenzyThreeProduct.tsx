import React from 'react'
import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { FarmFrenzyThreeProductResponse } from '@/model/response/farm-frenzy';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';

export default function FarmFrenzyThreeProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["farm-frenzy-three-product"],
    queryFn: async () => {
      let j = await request<FarmFrenzyThreeProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.FARM_FRENZY.THREE_PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const displayGrid = (d: FarmFrenzyThreeProductResponse) => (
    <img src={d.image} alt={d.name} className='w-10 h-10 rendering-crisp-edges'></img>
  );

  const displayDetail = (d: FarmFrenzyThreeProductResponse) => (
    <>
      <img src={d.image} alt={d.name}></img>

    </>
  );

  return (
    <>
      { (isLoading || !data) ? <Loading /> : <BasicGrid data={data} display={displayGrid} detail={displayDetail} /> }
    </>
  )
}
