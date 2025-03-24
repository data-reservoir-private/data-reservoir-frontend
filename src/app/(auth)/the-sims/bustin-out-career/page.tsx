import Paper from '@/components/common/paper/Paper';
import { TheSimsBustinOutCareerResponse } from '@/model/response/the-sims';
import { GetTheSimsData } from '@/service/the-sims';
import React from 'react'
import BustinOutCareerTable from './_table';

export default async function BustinOutCareerPage() {
  const data = await GetTheSimsData('bustin-out-career') as TheSimsBustinOutCareerResponse[];
  return (
    <Paper className='overflow-auto rounded-md h-full w-auto p-5'>
      <BustinOutCareerTable data={data}/>
    </Paper>
  );
}
