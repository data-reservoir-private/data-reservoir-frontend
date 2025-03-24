import Paper from '@/components/common/paper/Paper';
import { TheSimsTwoConsoleCareerResponse } from '@/model/response/the-sims';
import { GetTheSimsData } from '@/service/the-sims';
import React from 'react'
import TwoConsoleCareerTable from './_table';

export default async function TwoConsoleCareerPage() {
  const data = await GetTheSimsData('two-console-career') as TheSimsTwoConsoleCareerResponse[];
  return (
    <Paper className='overflow-auto rounded-md h-full w-auto p-5'>
      <TwoConsoleCareerTable data={data}/>
    </Paper>
  );
}
