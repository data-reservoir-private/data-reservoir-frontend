'use client';

import { DashboardResponse } from '@/model/response/dashboard';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { produce } from 'immer';
import Paper from '@/components/common/paper/Paper';
import TableBarChart from '@/components/app/dashboard/TableBarChart';
import TableTreeMap from '@/components/app/dashboard/TableTreeMap';
import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import Picker from '@/components/common/picker/Picker';
import { request } from '@/utilities/http';
import TableCategoryCount from '@/components/app/dashboard/TableCategoryCount';
import TablePieChart from './TablePieChart';
import Error from '@/components/common/error/Error';

interface DashboardClientPageProps {
  data: DashboardResponse[]
}

interface DashboardClientPageState {
  pickedCategories: string
}

export default function DashboardClientPage({ data }: DashboardClientPageProps) {
  const [state, setState] = useState<DashboardClientPageState>({
    pickedCategories: ''
  });

  const cleanData = data.filter(x => state.pickedCategories.length === 0 || state.pickedCategories.includes(x.category));
  const categories = data.map(x => x.category);
  
  const totalCategory = new Set(cleanData.map(x => x.category)).size;
  const totalTable = cleanData.flatMap(x => x.tables).length;
  const totalData = cleanData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0);
  const categorySummary = state.pickedCategories === '' ? cleanData.map(x => ({
    category: x.category,
    rowCount: x.tables.reduce((prev, current) => prev + current.rowCount, 0)
  })) : cleanData.find(x => x.category === state.pickedCategories)?.tables.map(x => ({
    category: x.tableName,
    rowCount: x.rowCount
  })) ?? [];

  // Data yang diambil harus berdasarkan kategori yang diambil
  const onClickCategory = (category: string, enabled: boolean) => {
    setState(produce(s => {
      if (enabled) s.pickedCategories = category;
      else s.pickedCategories = '';
    }));
  };

  return (
    <div className='flex flex-col gap-4 text-white h-auto'>
      {/* Layer 1 : Angka2 dan filter */}
      <div className='grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-lg:grid-rows-2'>
        <Paper className='px-4 col-span-2 p-4 text-xs max-lg:col-span-3'>
          <Picker options={categories} onClickCategory={onClickCategory} singleOption selected={state.pickedCategories} />
        </Paper>
        <Paper className='px-6'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Categories</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalCategory}</h1>
        </Paper>
        <Paper className='px-6'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Collections</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalTable}</h1>
        </Paper>
        <Paper className='px-6'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalData}</h1>
        </Paper>
      </div>

      {/* Layer 2 : Table dan Treemap */}
      <div className='grid grid-cols-2 grid-rows-1 gap-4 max-md:grid-rows-2 max-md:grid-cols-1 min-h-80'>
        <div className='overflow-y-auto overflow-x-hidden rounded-md scrollbar-default'>
          <Paper className='p-4 !justify-start min-w-full scrollbar-default'>
            <div className='min-w-full'>
              <TableCategoryCount data={categorySummary} isOneCategory={state.pickedCategories.length > 0} />
            </div>
          </Paper>
        </div>
        <div>
          <Paper className='h-full p-4 scrollbar-default'>
            <TableTreeMap data={cleanData} />
          </Paper>
        </div>
      </div>

      {/* Layer 3 : Pie Chart + Bar Chart */}
      <div className='grid grid-cols-2 grid-rows-1 gap-4 max-md:grid-rows-2 max-md:grid-cols-1 min-h-80'>
        <div className='overflow-y-auto overflow-x-hidden rounded-md scrollbar-default'>
          <Paper className='h-full p-4 scrollbar-default'>
            <TablePieChart data={categorySummary} />
          </Paper>
        </div>
        <div>
          <Paper className='h-full p-4 scrollbar-default'>
            <TableBarChart data={cleanData.flatMap(x => x.tables.flatMap(y => ({ ...y, category: x.category })))} />
          </Paper>
        </div>
      </div>
    </div>
  );

}