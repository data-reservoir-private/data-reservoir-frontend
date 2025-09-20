'use client';

import SimpleTable from '@/components/common/simple-table/SimpleTable';
import { DaysArray, MonthsArray } from '@/constant/date';
import { ITransactionMonthlyResponse } from '@/model/response/transaction'
import { createColumns } from '@/utilities/table'
import React from 'react'

export default function TopTable({ data }: { data: ITransactionMonthlyResponse['top'][] }) {

  const column = createColumns<ITransactionMonthlyResponse['top']>(col => [
    // createIndexColumn(col),
    col.accessor('date', {
      header: 'Date',
      cell: x => {
        const d = new Date(x.getValue());
        const month = MonthsArray.find(x => x.value === d.getMonth())!.label;
        const dayName = DaysArray[d.getDay()];
        return `${dayName}, ${d.getDate()} ${month}`;
      },
    }),
    col.accessor('category', {
      header: 'Category',
      cell: x => x.getValue(),
    }),
    col.accessor('order', {
      header: 'Order',
      cell: x => x.getValue(),
    }),
    col.accessor('tenant', {
      header: 'Tenant',
      cell: x => x.getValue(),
    }),
    col.accessor('price', {
      header: 'Price',
      cell: x => Math.round(x.getValue() * 100) / 100,
    }),
  ])

  return (
    <SimpleTable columns={column} data={data} />
  )
}
