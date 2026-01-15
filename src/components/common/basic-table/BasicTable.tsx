import React, { Fragment, useMemo, useState } from 'react';
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getExpandedRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, Row, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import { saveAs } from 'file-saver';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export interface BasicTableProps<T> {
  data: T[],
  columns: ColumnDef<T, unknown>[],
  expandElement?: (row: Row<T>) => React.ReactNode,
  exportType?: ('json' | 'csv')[],
}

export default function BasicTable<T>(props : BasicTableProps<T>) {
  const cachedColumn = useMemo(() => props.columns, [props.columns]);
  // const [cachedData,] = useState(props.data);
  const cachedData = useMemo(() => props.data, [props.data])
  const [canExpand, ] = useState(!!props.expandElement);
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

  function exportData(type: 'json' | 'csv')
  {
    const data = reactTable.getRowModel().rows.map(x => x.original);
    if (type === 'json') {
      saveAs(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'result.json');
    }
    else if (type === 'csv') {
      const separator = '\t';
      const header = Object.keys(data[0] as { [key: string]: string }).join(separator);
      const body = data.map(x => Object.values(x as { [key: string]: string }).map(y => y.toString().replaceAll('\n', '')))
        .reduce((acc, curr) => ([...acc, curr.join(separator)]), [])
        .join('\n');
      saveAs(new Blob([header, '\n', ...body], { type: 'text/csv', endings: 'native' }), 'result.csv');
    }
  }

  return (
    <TableContainer className='rounded-md relative overflow-auto scrollbar-default'>
      {
        props.exportType && props.exportType.length >= 1 &&
        <Box className='w-fit border-slate-700 border-2 border-b-0 overflow-hidden border-solid p-2 bg-bluish-200 gap-5 flex items-center text-white text-xs'>
          {(props.exportType.find(x => x === 'json')) &&
            <Box className='hover:bg-slate-700 cursor-pointer rounded-sm p-1' onClick={_ => exportData('json')}>
              Export to JSON
            </Box>
          }
          {(props.exportType.find(x => x === 'csv')) &&
            <Box className='hover:bg-slate-700 cursor-pointer rounded-sm p-1' onClick={_ => exportData('csv')}>
              Export to CSV
            </Box>
          }
        </Box>
      }
      <Table className='min-h-30 rounded-md min-w-full border-none '>
        <TableHead className='sticky top-0 bg-bluish-200 z-20'>
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
                      <TableCell key={header.id} className='p-2' colSpan={header.colSpan}>
                        {
                          header.isPlaceholder ? null : <Box className={classNames('flex flex-col', {
                            'min-w-32 gap-2': hasFilter
                          })}>
                            <Box className='flex justify-center gap-2'>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {
                                header.column.columnDef.enableSorting && (
                                  <div title='Hold shift while clicking for multisort' className='cursor-pointer hover:bg-slate-700 rounded-sm content-center' onClick={header.column.getToggleSortingHandler()}>
                                    {sortSymbol}
                                  </div>
                                )
                              }
                            </Box>
                            <Box>
                              {(hasFilter) && <BasicTableFilter column={header.column}/>}
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
                <TableHead>
                  {
                    row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className={classNames('px-2 py-2 text-xs', cell.column.columnDef.meta?.classes?.td ?? "", {
                        'text-center': (typeof cell.getValue() === 'number')
                      })}>
                        { cell.getIsPlaceholder() ? null : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))
                  }
                </TableHead>
                {
                  ((!!props.expandElement && row.getIsExpanded()) && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <Box>
                          {props.expandElement(row)}
                        </Box>
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

function BasicTableFilterSearch<T>(props: BasicTableFilterProps<T>) {

  // Ambil value searchnya
  const inputedQuery = props.column.getFilterValue() ? props.column.getFilterValue() as string : "";

  return (
    <div>
      <input
        className='text-sm font-normal bg-gray-700 rounded-sm w-full outline-none py-1 px-2 focus:ring-2 focus:ring-cyan-700'
        value={inputedQuery}
        onChange={e => {props.column.setFilterValue(e.target.value);}}
      />
    </div>
  );
}

function BasicTableFilter<T>(props: BasicTableFilterProps<T>) {
  const filterVariant = props.column.columnDef.meta?.filterVariant;
  // if (filterVariant === 'select') return (<BasicTableFilterSelect {...props}/>);
  if (filterVariant === 'search') return (<BasicTableFilterSearch {...props}/>);
  else return (<></>);
}
