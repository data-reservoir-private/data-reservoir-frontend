import React, { Fragment, useMemo, useState } from 'react';
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getExpandedRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, Row, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '../paper/Paper';
import TextField from '@mui/material/TextField';

export interface SimpleTableProps<T> {
  data: T[],
  columns: ColumnDef<T, any>[],
  expandElement?: (row: Row<T>) => React.ReactNode
}

export default function SimpleTable<T>(props: SimpleTableProps<T>) {
  const cachedColumn = useMemo(() => props.columns, [props.columns]);
  const cachedData = useMemo(() => props.data, [props.data])
  const [canExpand,] = useState(!!props.expandElement);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const reactTable = useReactTable({
    data: cachedData,
    columns: cachedColumn,
    state: {
      columnFilters
    },
    enableColumnFilters: true,

    getRowCanExpand: () => canExpand,
    enableExpanding: !!props.expandElement,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  return (
    <TableContainer component={Paper} className='rounded-md relative overflow-auto scrollbar-default'>
      <Table size='small' className='min-h-30 rounded-md min-w-full border-collapse relative'>
        <TableHead>
          {
            reactTable.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => {
                    const sortSymbol =
                      !header.column.getIsSorted() ? '⏸' :
                        header.column.getIsSorted() === 'asc' ? '🔼' : '🔽';
                    const v = header.column.columnDef.meta?.filterVariant;
                    const hasFilter = header.column.getCanFilter() && !!v;

                    return (
                      <TableCell key={header.id} className={classNames('p-2', {
                        'border-l border-l-TableCell-border first:border-l-0': !header.isPlaceholder
                      })} colSpan={header.colSpan}>
                        {
                          header.isPlaceholder ? null : <Box className={classNames('flex flex-col', {
                            'min-w-32 gap-2': hasFilter
                          })}>
                            <Box className='flex justify-center gap-2'>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {
                                header.column.columnDef.enableSorting && (
                                  <Box title='Hold shift while clicking for multisort' className='cursor-pointer rounded-sm content-center' onClick={header.column.getToggleSortingHandler()}>
                                    {sortSymbol}
                                  </Box>
                                )
                              }
                            </Box>
                            <Box>
                              {(hasFilter) && <BasicTableFilter column={header.column} />}
                            </Box>
                          </Box>
                        }
                      </TableCell>
                    );
                  })
                }
              </TableRow>
            ))
          }
        </TableHead>
        <TableBody>
          {
            reactTable.getRowModel().rows.map(row => (
              <Fragment key={row.id}>
                <TableRow>
                  {
                    row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className={classNames('px-2 py-2 text-xs bg-black/40', cell.column.columnDef.meta?.classes?.td ?? "", {
                        'text-center': (typeof cell.getValue() === 'number')
                      })}>
                        {cell.getIsPlaceholder() ? null : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))
                  }
                </TableRow>
                {
                  ((!!props.expandElement && row.getIsExpanded()) && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <div>
                          {props.expandElement(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </Fragment>

            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface BasicTableFilterProps<T> {
  column: Column<T, unknown>
}

// function BasicTableFilterSelect<T>(props: BasicTableFilterProps<T>)
// {
//   // Ambil value unique dari 1 col ini
//   const uniq = props.column.getFacetedUniqueValues();

//   // Ambil value yang sekarang dipilih
//   const pickedValues = props.column.getFilterValue() ? props.column.getFilterValue() as (string | number)[] : [];

//   // Memoize biar bisa dirender
//   const uniqueValues = useMemo(() => {
//     return Array.from<string | number>(uniq.keys()).sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
//   }, [uniq]);

//   if (uniqueValues.length === 0) return (<></>);

//   return (
//     <Listbox value={pickedValues} multiple onChange={e => props.column.setFilterValue(e)}>
//       <div className='relative'>
//         <ListboxButton className='text-sm font-normal bg-gray-700 rounded-sm w-full py-1 px-2 data-[open]:ring-2 data-[open]:ring-cyan-700'>{pickedValues.length} Selected</ListboxButton>
//         <ListboxOptions className={'z-50 absolute bottom-auto bg-bluish w-full rounded-md max-h-40 overflow-y-scroll scrollbar-default'}>
//           {
//             uniqueValues.map(x => (
//               <ListboxOption className='px-2 py-1 text-left cursor-pointer' value={x} key={x}>
//                 <div className='hover:bg-gray-600 w-full p-1 rounded-md font-light text-sm flex gap-3'>
//                   {pickedValues.includes(x) &&
//                     <div className='items-center text-center flex'>
//                       <BiCheck className='text-normal'/>
//                     </div>
//                   }
//                   <span className='text-xs'>{x}</span>
//                 </div>
//               </ListboxOption>
//             ))
//           }
//         </ListboxOptions>
//       </div>
//     </Listbox>
//   );
// }

function SimpleTableFilterSearch<T>(props: BasicTableFilterProps<T>) {

  // Ambil value searchnya
  const inputedQuery = props.column.getFilterValue() ? props.column.getFilterValue() as string : "";

  return (
    <Box>
      <TextField
        size='small'
        value={inputedQuery}
        onChange={e => { props.column.setFilterValue(e.target.value); }}
      />
    </Box>
  );
}

function BasicTableFilter<T>(props: BasicTableFilterProps<T>) {
  const filterVariant = props.column.columnDef.meta?.filterVariant;
  // if (filterVariant === 'select') return (<BasicTableFilterSelect {...props}/>);
  if (filterVariant === 'search') return (<SimpleTableFilterSearch {...props} />);
  else return (<></>);
}
