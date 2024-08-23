import React, { useMemo } from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, Row } from '@tanstack/react-table';
import { Checkbox } from 'flowbite-react';
import { getStaticIndex, multiSelectFilter } from '@/utilities/table';
import { HayDayProductDetailResponse, HayDayProductResponse } from '@/model/response/hayday';
import { secondToTimespan } from '@/utilities/general';

export default function HaydayProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["hayday-product"],
    queryFn: async () => {
      let j = await request<HayDayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<HayDayProductResponse>();
  const columns = [
    colHelper.display({
      id: 'expand',
      header: (p) => {
        return (<div title='Click to unexpand rows' className='cursor-pointer' onClick={_ => {
          p.table.getRowModel().rows.filter(o => o.getIsExpanded()).forEach(o => o.toggleExpanded(false))
        }}>
          🔴
        </div>)
      },
      cell: (p) => !p.row.getCanExpand() ? '❌' :  (<div className='cursor-pointer' onClick={p.row.getToggleExpandedHandler()}>{ p.row.getIsExpanded() ? '👇' : '👉' }</div>),
    }),
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>),
    }),
    colHelper.display({
      id: "image",
      cell: p => (
        <div className='flex justify-center w-16 h-16'>
          <img className='w-16 h-16 rounded-md' src={p.row.original.image} alt={p.row.original.name}></img>
        </div>
      ),
      header: "Image"
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
    }),
    colHelper.accessor('price', {
      cell: p => p.getValue(),
      header: "Price",
      enableSorting: true
    }),
    colHelper.accessor('level', {
      cell: p => p.getValue(),
      header: "Level",
      enableSorting: true
    }),
    colHelper.accessor('time', {
      cell: p => secondToTimespan(p.getValue()),
      header: "Time",
      enableSorting: true
    }),
    colHelper.accessor('isRaw', {
      cell: p => (
        <div className='flex justify-center'>
          <Checkbox className='w-5 h-5' color='gray' disabled checked={p.getValue()}/>
        </div>
      ),
      header: "Raw",
      enableSorting: true
    }),
    colHelper.accessor('xp', {
      cell: p => p.getValue(),
      header: "XP",
      enableSorting: true
    }),
  ];

  return (
    <Paper className='max-h-[800px] overflow-auto rounded-md'>
      <div className='p-5 inline-block min-w-full'>
        { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns} expandElement={r => <ExpandMe row={r}/>}/> }
      </div>
    </Paper>
  )
}

interface ExpandMeProps {
  row: Row<HayDayProductResponse>
}

function ExpandMe(props : ExpandMeProps) {
  let memoID = useMemo(() => props.row.original.id, [props.row.original.id]);
  let { data, isLoading } = useQuery({
    queryKey: [memoID],
    queryFn: async () => {
      let j = await request<HayDayProductDetailResponse, {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.PRODUCT + `/${memoID}`,
      });
      return (j!.data!);
    },
  });

  if (isLoading) return (<Loading/>);

  return (
    <Paper className='bg-slate-700'>
      <div className='flex gap-5 py-3 px-4'>
        <div className='flex items-center'>
          <img src={props.row.original.image} alt={props.row.original.name} className='w-32 h-32' />
        </div>
        <div className='flex-1'>
          <div>
            <h1 className='text-white font-bold text-2xl'>{props.row.original.name}</h1>
            <div className='flex gap-5'>
              <div className='flex gap-2' title='Price per unit'>
                <img src="https://static.wikia.nocookie.net/hayday/images/6/6d/Coin.png/" alt="Coin" className='w-5 h-5' />
                <span>{props.row.original.price}</span>
              </div>
              <div className='flex gap-2' title='Exp level needed'>
                <img src="https://static.wikia.nocookie.net/hayday/images/e/e1/Experience.png/" alt="XP" className='w-5 h-5' />
                <span>Lvl. {props.row.original.level}</span>
              </div>
              <div className='flex gap-2' title='XP per unit'>
                <img src="https://static.wikia.nocookie.net/hayday/images/e/e1/Experience.png/" alt="XP" className='w-5 h-5' />
                <span>+{props.row.original.xp}</span>
              </div>
              <div className='flex gap-2' title='Time'>
                <img src="https://static.wikia.nocookie.net/hayday/images/3/35/Clock.png/" alt="Time" className='w-5 h-5' />
                <span>{secondToTimespan(props.row.original.time)}</span>
              </div>
            </div>
            {
              (!isLoading && data && (
                (data.ingredient.length) > 0 ||
                (data.usedBy.length) > 0 ||
                !!data.producer
              )) && (
              <>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div className='flex justify-between'>
                  {
                    ((data.ingredient.length) > 0) && (
                      <div>
                        <h3 className='font-bold mb-4'>Ingredient</h3>
                        {
                          data.ingredient.map(ing => (
                            <div className='flex items-center gap-3' key={ing.name} title={ing.name}>
                              <img src={ing.image} alt={ing.name} className='w-8 h-8' />
                              <div className='flex gap-2'>
                                <span className='font-bold'>{ing.name}</span>
                                <span>{ing.quantity}</span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                  {(data.producer) && (
                    <div>
                      <h3 className='font-bold mb-4'>Made with</h3>
                      <div className='flex items-center gap-3' key={data.producer?.name} title={data.producer?.name}>
                        <img src={data.producer?.image} alt={data.producer?.name} className='w-32 h-32' />
                      </div>
                    </div>
                  )}
                  {
                    data.usedBy.length > 0 &&(
                      <div>
                        <h3 className='font-bold mb-4'>Used By</h3> 
                        {
                          data.usedBy.map(used => (
                            <div className='flex items-center gap-3' key={used.name} title={used.name}>
                              <img src={used.image} alt={used.name} className='w-8 h-8' />
                              <div className='flex gap-2'>
                                <span className='font-bold'>{used.name}</span>
                                <span>{used.quantity}</span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Paper>
  )
}

