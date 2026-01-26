'use client'

import Paper from '@/components/common/paper/Paper';
import Section from '@/components/common/paper/Section';
import { IPeriodicTableElementResponse } from '@/model/response/periodic-table';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { Metadata } from 'next';
import React, { useState } from 'react'

export const metadata: Metadata = {
  title: 'Periodic Table Element - Data Reservoir'
}

export default function PeriodicTableClient({ data }: { data: IPeriodicTableElementResponse[] }) {

  const [element, setElement] = useState<IPeriodicTableElementResponse | null>(null);

  return (
    <Section name='Periodic Table Elements' variant='h4'>
      <Box className='grid grid-rows-10 grid-cols-18 gap-0.5'>
        {
          data.map(el => <Element element={el} key={el.id} onClick={setElement} />)
        }
        {
          element &&
          <Paper className={classNames('col-start-4 col-end-12 row-start-1 row-end-3 p-3', {
            'bg-gray-700/20': element && element.category.startsWith('unknown'),
            'bg-purple-800/20': element && element.category === 'noble gas',
            'bg-red-700/20': element && element.category === 'alkali metal',
            'bg-orange-700/20': element && element.category === 'alkaline earth metal',
            'bg-teal-700/20': element && element.category === 'transition metal',
            'bg-orange-300/20': element && element.category === 'polyatomic nonmetal',
            'bg-amber-300/20': element && element.category === 'post-transition metal',
            'bg-green-300/20': element && element.category === 'metalloid',
            'bg-green-500/20': element && element.category === 'lanthanide',
            'bg-lime-500/20': element && element.category === 'actinide',
            'bg-sky-800/20': element && element.category === 'diatomic nonmetal' && element.number !== 1,
            'bg-blue-500/20': element && element.category === 'diatomic nonmetal' && element.number === 1,
          })}>
            <Typography variant='h5' className='mb-2 font-bold'>{element.name} ({element.symbol} {element.number})</Typography>
            <Typography className='text-sm'>Atomic Mass: {Math.round(element.atomicMass * 1000) / 1000}</Typography>
            <Typography className='text-sm'>Category: {element.category}</Typography>
          </Paper>
        }
      </Box>
    </Section>
  )
}

function Element({ element, className, onClick }: { element: IPeriodicTableElementResponse, className?: string, sx?: SxProps<Theme>, onClick: (el: IPeriodicTableElementResponse) => void }) {
  return (
    <Tooltip title={element?.name} arrow key={element?.id}>
      <Box sx={{
        gridRowStart: element.ypos,
        gridColumnStart: element.xpos
      }} className={classNames(
        'w-full h-full aspect-square flex justify-center items-center',
        'hover:brightness-80 transition-all relative cursor-pointer',
        className,
        {
          'border-2 border-divider border-solid': !!element,
          'bg-gray-700/50': element && element.category.startsWith('unknown'),
          'bg-purple-800/50': element && element.category === 'noble gas',
          'bg-red-700/50': element && element.category === 'alkali metal',
          'bg-orange-700/50': element && element.category === 'alkaline earth metal',
          'bg-teal-700/50': element && element.category === 'transition metal',
          'bg-orange-300/50': element && element.category === 'polyatomic nonmetal',
          'bg-amber-300/50': element && element.category === 'post-transition metal',
          'bg-green-300/50': element && element.category === 'metalloid',
          'bg-green-500/50': element && element.category === 'lanthanide',
          'bg-lime-500/50': element && element.category === 'actinide',
          'bg-sky-800/50': element && element.category === 'diatomic nonmetal' && element.number !== 1,
          'bg-blue-500/50': element && element.category === 'diatomic nonmetal' && element.number === 1,
        }
      )}
        onClick={() => onClick(element)}
      >
        <Typography className='text-lg font-bold max-md:text-xs max-lg:text-md lg:text-xl'>
          {element ? element.symbol : ""}
        </Typography>
        <Typography className='text-[9px] xl:text-sm max-lg:hidden absolute bottom-0 w-full text-center'>
          {element ? Math.round(element.atomicMass * 1000) / 1000 : ""}
        </Typography>
        <Typography className='text-[9px] xl:text-sm max-lg:hidden absolute right-0 top-0 p-0.5 font-[inconsolata]'>
          {element.number}
        </Typography>
      </Box>
    </Tooltip>
  )
}