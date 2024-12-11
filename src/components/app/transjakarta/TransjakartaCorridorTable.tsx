import React from 'react';
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TransjakartaCorridorResponse } from '@/model/response/transjakarta';
import { request } from '@/utilities/http';
import { multiSelectFilter } from '@/utilities/table';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import TransjakartaCode from './TransjakartaCode';
import { useAppStore } from '@/store/store';
import { PiWarningFill } from 'react-icons/pi';
import classNames from 'classnames';
import { Button } from 'flowbite-react';


export default function TransjakartaCorridorTable() {
  const [setCorridor, clearCorridor, corridorCode] = useAppStore(x => [x.transjakarta.setCorridorCode, x.transjakarta.clearCorridor, x.transjakarta.corridorCode]);

  const { isLoading, data } = useQuery({
    queryKey: ["transjakarta-corridor"],
    queryFn: async () => {
      const j = await request<TransjakartaCorridorResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.CORRIDOR,
      });
      return (j?.data ?? []);
    }
  });

  const handleOnClickCorridor = (code: string) => {
    if (code === corridorCode) clearCorridor();
    else setCorridor(code);
  };

  const handleOnResetCorridor = () => { 
    clearCorridor();
  };

  const colHelper = createColumnHelper<TransjakartaCorridorResponse>();
  const columns: ColumnDef<TransjakartaCorridorResponse, any>[] = [
    colHelper.accessor('code', {
      id: 'code',
      header: "#",
      enableSorting: true,
      cell: p => (<TransjakartaCode code={p.getValue()} color={p.row.original.color} onClickCode={handleOnClickCorridor}/>)
    }),
    colHelper.display({
      id: 'status',
      header: '',
      cell: p => {
        const total = p.row.original.problem;
        return total > 0 ? (<PiWarningFill className={classNames('text-lg', {
          'text-yellow-300': 1 <= total && total <= 5,
          'text-red-500': total > 5
        })} title={`This route has ${total} problematic stop(s)`}/>) : ("");
      }
    }),
    colHelper.accessor('name', {
      cell: p => p.getValue(),
      header: "Name",
      enableSorting: true,
      filterFn: (row, _, select: string) => {
        return row.original.name.toLowerCase().includes(select.toLowerCase()) || row.original.code.toLowerCase().includes(select.toLowerCase());
      },
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
    <Paper className='h-full rounded-md'>
      <div className='p-5 flex justify-center gap-3 items-center flex-col'>
        {(isLoading || !data) ? <Loading /> :
          <>
            <div className='flex justify-end w-full'>
              <Button onClick={handleOnResetCorridor}>Reset</Button>
            </div>
            <div className='!overflow-scroll w-full scrollbar-default max-h-[500px]'>
              <BasicTable data={data} columns={columns}/>
            </div>
          </>
        }
      </div>
    </Paper>
  );
}