import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex } from '@/utilities/table';
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

  const displayGrid = (d: FarmFrenzyThreeProductResponse) => {
    return (
      <img src={d.image} alt={d.name} className='w-11 h-11'></img>
    )
  }

  return (
    <>
      { (isLoading || !data) ? <Loading /> : <BasicGrid data={data} display={displayGrid} /> }
    </>
  )

  // const colHelper = createColumnHelper<FarmFrenzyThreeProductResponse>();
  // const columns = [
  //   colHelper.display({
  //     id: 'index',
  //     header: "#",
  //     cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>),
  //   }),
  //   colHelper.display({
  //     id: "image",
  //     cell: p => (
  //       <div className='flex justify-center'>
  //         <img className='w-24 rounded-md' src={p.row.original.image} alt={p.row.original.name}></img>
  //       </div>
  //     ),
  //     header: "Image"
  //   }),
  //   colHelper.accessor('name', {
  //     cell: p => p.getValue(),
  //     header: "Name",
  //     filterFn: 'includesString',
  //     meta: {
  //       filterVariant: 'search'
  //     }
  //   }),
  //   colHelper.accessor('price', {
  //     cell: p => p.getValue(),
  //     header: "Price",
  //     enableSorting: true
  //   }),
  // ];

  // return (
  //   <Paper className='max-h-[800px] overflow-auto rounded-md'>
  //     <div className='p-5 inline-block min-w-full'>
  //       { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns}/> }
  //     </div>
  //   </Paper>
  // )
}
