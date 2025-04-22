import Paper from '@/components/common/paper/Paper';
import { GetHaydayOrderSummary } from '@/service/hayday'
import Image from 'next/image';
import React from 'react'
import HaydayBoxChart from '@/components/app/hayday/HaydayBoxChart';
import HaydayClientDistribution from '@/components/app/hayday/HaydayClientDistribution';

export default async function HaydayDashboard() {
  const data = await GetHaydayOrderSummary();

  return (
    <div className='flex flex-col text-white gap-6'>
      <h1 className='text-2xl font-bold'>Hayday Dashboard</h1>

      {/* Income */}
      <div className='flex justify-between gap-3 w-full max-md:flex-col'>
        <Paper className='w-full px-10 max-md:py-3 flex justify-between items-center'>
          <Image src='/image/hay_day/xp.png' width={6} height={6} className='w-8 h-8' alt='Blue' />
          <p className='text-xl font-bold'>{data.income.event.coin}</p>
        </Paper>
        <Paper className='w-full px-10 max-md:py-3 flex justify-between items-center'>
          <Image src='/image/hay_day/coins.png' width={6} height={6} className='w-8 h-8' alt='Blue' />
          <p className='text-xl font-bold'>{data.income.event.xp}</p>
        </Paper>
        <div className='grid grid-cols-2 grid-rows-2 gap-3 w-full'>
          <Paper className='flex p-1 px-4 gap-2 justify-between items-center'>
            <Image src='/image/hay_day/green.png' width={6} height={6} className='w-4 h-4' alt='Green' />
            <span>{data.voucher.green}</span>
          </Paper>
          <Paper className='flex p-1 px-4 gap-2 justify-between items-center'>
            <Image src='/image/hay_day/blue.png' width={6} height={6} className='w-4 h-4' alt='Blue' />
            <span>{data.voucher.blue}</span>
          </Paper>
          <Paper className='flex p-1 px-4 gap-2 justify-between items-center'>
            <Image src='/image/hay_day/purple.png' width={6} height={6} className='w-4 h-4' alt='Purple' />
            <span>{data.voucher.purple}</span>
          </Paper>
          <Paper className='flex p-1 px-4 gap-2 justify-between items-center'>
            <Image src='/image/hay_day/gold.png' width={6} height={6} className='w-4 h-4' alt='Gold' />
            <span>{data.voucher.gold}</span>
          </Paper>
        </div>
      </div>

      {/* Boxplot of monthlies */}
      <Paper className='flex flex-col p-3'>
        <h1 className='text-xl font-bold'>Revenue Distribution</h1>
        <HaydayBoxChart {...data.revenue}/>
      </Paper>

      {/* Client Distribution With XP and Coins Distibution */}
      <Paper className='flex flex-col p-3'>
        <h1 className='text-xl font-bold'>Client Distribution</h1>
        <HaydayClientDistribution data={data.clients}/>
      </Paper>
    </div>
  )
}
