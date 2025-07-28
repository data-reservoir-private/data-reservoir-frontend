'use client'

import SimpleTable from '@/components/common/simple-table/SimpleTable';
import { ITheSimsResponse } from '@/model/response/the-sims'
import { createColumns } from '@/utilities/table';
import React from 'react'

interface TwoConsoleCareerTableProps {
  data: ITheSimsResponse['two-console-career'][]
}

export default function TwoConsoleCareerTable({ data }: TwoConsoleCareerTableProps) {
  const cols = createColumns<ITheSimsResponse['two-console-career']>(h => [
    h.accessor('career', {
      cell: (x) => x.getValue(),
      header: 'Career',
    }),
    h.accessor('level', {
      cell: (x) => x.getValue(),
      header: 'Level'
    }),
    h.accessor('job', {
      cell: (x) => x.getValue(),
      header: 'Job'
    }),
    h.accessor('description', {
      cell: (x) => x.getValue(),
      header: 'Description',
      meta: {
        classes: {
          td: 'min-w-24'
        }
      }
    }),
    h.display({
      cell: (x) => `${x.row.original.workStart} - ${x.row.original.workEnd}`,
      header: 'Work Time'
    }),
    h.accessor('salary', {
      cell: (x) => x.getValue(),
      header: 'Salary'
    }),
    h.accessor('promotion', {
      cell: (x) => x.getValue(),
      header: 'Promotion Bonus'
    }),
    h.group({
      header: 'Requirements',
      columns: [
        h.accessor('cooking', {
          cell: (x) => x.getValue(),
          header: 'Cooking'
        }),
        h.accessor('mechanical', {
          cell: (x) => x.getValue(),
          header: 'Mechanical'
        }),
        h.accessor('charisma', {
          cell: (x) => x.getValue(),
          header: 'Charisma'
        }),
        h.accessor('body', {
          cell: (x) => x.getValue(),
          header: 'Body'
        }),
        h.accessor('logic', {
          cell: (x) => x.getValue(),
          header: 'Logic'
        }),
        h.accessor('creativity', {
          cell: (x) => x.getValue(),
          header: 'Creativity'
        }),
        h.accessor('cleanliness', {
          cell: (x) => x.getValue(),
          header: 'Cleanliness'
        }),
        h.accessor('friends', {
          cell: (x) => x.getValue(),
          header: 'Friends'
        }),

      ]
    })
  ]);

  return (
    <SimpleTable columns={cols} data={data}/>
  )
}
