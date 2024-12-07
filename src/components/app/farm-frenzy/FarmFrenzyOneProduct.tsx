import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex } from '@/utilities/table';
import { FarmFrenzyOneProductResponse } from '@/model/response/farm-frenzy';

export default function FarmFrenzyOneProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["farm-frenzy-one-product"],
    queryFn: async () => {
      let j = await request<FarmFrenzyOneProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.FARM_FRENZY.ONE_PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<FarmFrenzyOneProductResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>),
    }),
    colHelper.display({
      id: "image",
      cell: p => (
        <div className='flex justify-center'>
          <img className='w-10 rounded-md' src={p.row.original.image} alt={p.row.original.name}></img>
        </div>
      ),
      header: "Image"
    }),
    colHelper.accessor('name', {
      cell: p => p.getValue(),
      header: "Name",
      enableColumnFilter: true,
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    }),
    colHelper.accessor('price', {
      cell: p => p.getValue(),
      header: "Price",
      enableSorting: true
    }),
  ];

  return (
    <Paper className='max-h-[800px] overflow-auto rounded-md'>
      <div className='p-5 inline-block min-w-full'>
        { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns}/> }
      </div>
    </Paper>
  )
}
