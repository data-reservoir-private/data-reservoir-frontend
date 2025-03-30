import { ColumnDef, ColumnHelper, createColumnHelper, Row, Table } from "@tanstack/react-table";
import React from "react";

/**
 * Sorting function untuk react-table. Mirip 'arrIncludesSome', tapi bisa untuk string / number
 * 
 * @param row Row dari tanstack
 * @param columnId Column ID
 * @param selectValue Value yang dipilih pada combobox
 * @returns Boolean, apakah row ini mau dimasukkan atau nga
 */
export function multiSelectFilter<TData>(row: Row<TData>, columnId: string, selectValue: (string | number)[]) {
  const v = row.getValue(columnId);
  return selectValue.length === 0 || selectValue.includes(v as (string | number));
}

export function getStaticIndex<TData>(row: Row<TData>, table: Table<TData>) {
  return (table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1;
}

export function createColumns<TData>(fn: (colHelper: ColumnHelper<TData>) => ColumnDef<TData, any>[]) {
  return fn(createColumnHelper<TData>());
}

export function createIndexColumn<TData>(colHelper: ColumnHelper<TData>) {
  return colHelper.display({
    id: 'index',
    header: "#",
    cell: ({ row, table }) => (
      React.createElement('div', {
        className: 'text-center font-bold'
      }, getStaticIndex(row, table))
    )
  });
}