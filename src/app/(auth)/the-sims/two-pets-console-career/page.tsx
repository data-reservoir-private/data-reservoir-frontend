import Paper from '@/components/common/paper/Paper';
import { TheSimsTwoPetsConsoleCareerResponse } from '@/model/response/the-sims';
import { GetTheSimsData } from '@/service/the-sims';
import React from 'react'
import TwoPetsConsoleCareerTable from './_table';

export default async function TwoPetsConsoleCareerPage() {
  const data = await GetTheSimsData('two-pets-console-career') as TheSimsTwoPetsConsoleCareerResponse[];
  return (
    <Paper className='overflow-auto rounded-md h-full w-auto p-5'>
      <TwoPetsConsoleCareerTable data={data}/>
    </Paper>
  );
}
