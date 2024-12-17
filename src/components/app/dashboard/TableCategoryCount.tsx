import BasicTable from '@/components/common/basic-table/BasicTable';
import { getCategoryColorClass } from '@/utilities/color';
import { getStaticIndex } from '@/utilities/table';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import classNames from 'classnames';
import React, { useMemo } from 'react';

export interface TableCategoryCountProps {
  data: { category: string, rowCount: number }[]
}

export default function TableCategoryCount(props: TableCategoryCountProps) {
  
  const data = useMemo(() => props.data, [props]);
  const columnHelper = createColumnHelper<{ category: string, rowCount: number }>();

  const column: ColumnDef<{ category: string, rowCount: number }, any>[] = [
    columnHelper.display({
      header: '#',
      cell: ({ row, table }) => <p className='text-center font-bold'>{getStaticIndex(row, table)}</p>
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      enableColumnFilter: false,
      enableSorting: true,
      cell: p => (
        <div className='flex gap-4'>
          <div className={classNames('category-table w-5 h-5 rounded-full', getCategoryColorClass(p.getValue()))}></div>
          <span>
            {p.getValue()}
          </span>
        </div>
      )
    }),
    columnHelper.accessor('rowCount', {
      header: 'Count',
      cell: p => p.getValue(),
      enableColumnFilter: false,
      enableSorting: true
    })
  ];

  return (
    <div>
      <BasicTable data={data} columns={column}/>
    </div>
  );
}
