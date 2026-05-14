'use client';

import SimpleTable from '@/components/common/simple-table/SimpleTable';
import { DaysArray, MonthsArray } from '@/constant/date';
import { ITransactionBreakdownResponse } from '@/model/response/transaction';
import { createColumns, createIndexColumn } from '@/utilities/table';

export default function TopTable({ data }: { data: ITransactionBreakdownResponse['top'][] }) {
  const column = createColumns<ITransactionBreakdownResponse['top']>(col => [
    createIndexColumn(col),
    col.accessor('date', {
      header: 'Date',
      cell: x => {
        const d = new Date(x.getValue());
        const month = MonthsArray.find(x => x.value === d.getMonth() + 1)!.label;
        const dayName = DaysArray[d.getDay()];
        return `${dayName}, ${d.getDate()} ${month} ${d.getFullYear()}`;
      },
      enableSorting: true,
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
      enableSorting: true,
    }),
  ]);

  return (
    <SimpleTable columns={column} data={data} />
  );
}
