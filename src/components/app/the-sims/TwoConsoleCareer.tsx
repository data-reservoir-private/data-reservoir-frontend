import React from 'react';
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TheSimsTwoConsoleCareerResponse } from '@/model/response/the-sims';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getStaticIndex, multiSelectFilter } from '@/utilities/table';
import { SIMOLEON_ICON } from '@/utilities/char';
import { ticksToTime } from '@/utilities/general';
import Image from 'next/image';

export default function TwoConsoleCareer() {
  const { isLoading, data } = useQuery({
    queryKey: ["the-sims-two-console-career"],
    queryFn: async () => {
      const j = await request<TheSimsTwoConsoleCareerResponse[], {}>({
        method: "GET",
        url: API_ROUTE.THE_SIMS.TWO_CONSOLE_CAREER,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<TheSimsTwoConsoleCareerResponse>();
  const columns: ColumnDef<TheSimsTwoConsoleCareerResponse, any>[] = [
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>)
    }),
    colHelper.accessor('career', {
      cell: p => p.getValue(),
      header: "Career",
      filterFn: multiSelectFilter,
      enableSorting: true,
      meta: {
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('level', {
      cell: p => p.getValue(),
      header: "Level",
      filterFn: multiSelectFilter,
      enableSorting: true,
      meta: {
        filterVariant: 'select'
      }
    }),
    colHelper.accessor('job', {
      cell: p => p.getValue(),
      header: "Job",
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    }),
    colHelper.accessor('salary', {
      cell: p => `${SIMOLEON_ICON}${p.getValue()}`,
      header: "Salary",
      enableSorting: true
    }),
    colHelper.accessor('promotion', {
      cell: p => `${SIMOLEON_ICON}${p.getValue()}`,
      header: "Promotion Salary",
      enableSorting: true
    }),
    colHelper.display({
      cell: p => `${ticksToTime(p.row.original.work_start)} - ${ticksToTime(p.row.original.work_end)}`,
      header: "Work Hours"
    }),

    colHelper.accessor('friends', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_skill/friends.png'} alt='Friends' title='Friends' width={50} height={50} className='p-0.5'/>)
    }),

    colHelper.accessor('cooking', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/cooking.png'} alt='Cooking' title='Cooking' width={200} height={200} className='p-0.5'/>)
    }),
    colHelper.accessor('mechanical', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/mechanical.png'} alt='Mechanical' title='Mechanical' width={200} height={200} className='p-0.5'/>)
    }),
    colHelper.accessor('charisma', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/charisma.png'} alt='Charisma' title='Charisma' width={200} height={200} className='p-0.5'/>)
    }),
    colHelper.accessor('body', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/body.png'} alt='Body' title='Body' width={200} height={200} className='p-0.5'/>)
    }),
    colHelper.accessor('creativity', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/creativity.png'} alt='Creativity' title='Creativity' width={200} height={200} className='p-0.5'/>)
    }),
    colHelper.accessor('logic', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/logic.png'} alt='Logic' title='Logic' width={200} height={200} className='p-0.5'/>)
    }),
    colHelper.accessor('cleanliness', {
      cell: p => p.getValue(),
      header: _ => (<Image src={'/image/the_sims_2_console_skill/cleaning.png'} alt='Cleaning' title='Cleaning' width={200} height={200} className='p-0.5'/>)
    }),

    colHelper.accessor('description', {
      cell: p => (
        <span title={p.getValue()} className='text-xs text-justify line-clamp-6'>{p.getValue()}</span>
      ),
      header: "Description"
    }),
  ];

  return (
    <Paper className='overflow-auto rounded-md h-full w-auto p-5'>
      { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns}/> }
    </Paper>
  );
}
