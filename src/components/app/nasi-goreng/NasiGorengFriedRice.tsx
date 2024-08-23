import React from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex, multiSelectFilter } from '@/utilities/table';
import { NasiGorengFriedRiceResponse } from '@/model/response/nasi-goreng';

export default function NasiGorengFriedRice() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-fried-rice'],
    queryFn: async () => {
      let j = await request<NasiGorengFriedRiceResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.FRIED_RICE,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<NasiGorengFriedRiceResponse>();
  const columns = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>)
    }),
    colHelper.group({
      header: 'Image',
      columns: [
        colHelper.display({
          id: 'image-1',
          header: 'Image Level 1',
          cell: p => (
            <div className='flex justify-center w-full'>
              <img className='h-16 rounded-md' src={p.row.original.level1Image} alt={p.row.original.name}></img>
            </div>
          )
        }),
        colHelper.display({
          id: 'image-6',
          header: 'Image Level 6',
          cell: p => (
            <div className='flex justify-center w-full'>
              <img className='h-16 rounded-md' src={p.row.original.level6Image} alt={p.row.original.name}></img>
            </div>
          )
        }),
      ]
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
    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-4'>{p.getValue()}</span>
      ),
      header: "Description"
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
