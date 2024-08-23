import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TransjakartaCorridorResponse } from '@/model/response/transjakarta';
import { request } from '@/utilities/http';
import { multiSelectFilter } from '@/utilities/table';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import TransjakartaCode from './TransjakartaCode';

export type TransjakartaCorridorProps = {
  onClickCorridor: (code: string) => void
}

export default function TransjakartaCorridor(props: TransjakartaCorridorProps) {
  const [code, setCode] = useState("");

  useEffect(() => {
    props.onClickCorridor(code);
  }, [code, props])

  const { isLoading, data } = useQuery({
    queryKey: ["transjakarta-corridor"],
    queryFn: async () => {
      let j = await request<TransjakartaCorridorResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.CORRIDOR,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TransjakartaCorridorResponse>();
  const columns = [
    colHelper.display({
      id: 'code',
      header: "#",
      cell: p => (<TransjakartaCode code={p.row.original.code} color={p.row.original.color} onClickCode={e => { setCode(e) }}/>)
    }),
    colHelper.accessor('name', {
      cell: p => p.getValue(),
      header: "Name",
      enableSorting: true,
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    }),
    colHelper.accessor('category', {
      cell: p => p.getValue(),
      header: "Category",
      filterFn: multiSelectFilter,
      enableSorting: true,
      meta: {
        filterVariant: 'select'
      }
    })
  ];

  return (
    <Paper className='overflow-auto rounded-md'>
      <div className='p-5 inline-block h-[450px]'>
        { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns}/> }
      </div>
    </Paper>
  )
}