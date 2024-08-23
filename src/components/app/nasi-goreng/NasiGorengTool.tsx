import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex } from '@/utilities/table';
import { NasiGorengToolResponse } from '@/model/response/nasi-goreng';

export default function NasiGorengTool() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-tool'],
    queryFn: async () => {
      let j = await request<NasiGorengToolResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.TOOL,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<NasiGorengToolResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>)
    }),
    colHelper.display({
      id: 'image',
      header: 'Image',
      cell: p => (
        <div className='flex justify-center w-full'>
          <img className='h-16 rounded-md' src={p.row.original.image} alt={p.row.original.name}></img>
        </div>
      )
    }),
    colHelper.accessor('name', {
      cell: p => p.getValue(),
      header: "Name",
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    }),
    colHelper.accessor('price', {
      cell: p => `${p.getValue()}`,
      header: "Price",
      enableSorting: true,
    }),
    colHelper.accessor('shortDescription', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-4'>{p.getValue()}</span>
      ),
      header: "Short Description"
    }),
    colHelper.accessor('longDescription', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-4'>{p.getValue()}</span>
      ),
      header: "Long Description"
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
