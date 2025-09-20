import Section from '@/components/common/paper/Section';
import { API_ROUTE } from '@/constant/api-route';
import { IPeriodicTableElementResponse } from '@/model/response/periodic-table';
import { grabData } from '@/utilities/http';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Periodic Table Element - Data Reservoir'
}

export default async function PeriodicTable() {
  const { data } = await grabData<IPeriodicTableElementResponse[]>(API_ROUTE.PERIODIC_TABLE_ELEMENT, {
    pageSize: 0,
  });

  // const first = data.find(x => x.number === 1)!;

  return (
    <Section name='Periodic Table Elements' variant='h4'>
      <Box className='grid grid-rows-10 grid-cols-[repeat(18,minmax(0,1fr))] gap-0.5'>
        {
          data.map(el => <Element element={el} key={el.id} />)
        }
        {/* <Box sx={{
          gridRowStart: 1,
          gridColumnStart: 4,
          gridRowEnd: 3,
          gridColumnEnd: 12,
        }}>
          <Paper className='w-full h-full p-2 flex flex-col justify-center'>
            <Typography variant="h6" className='font-bold grow'>{first.symbol} - {first.name}</Typography>
            <Typography variant="body2">Atomic Number: {first.number}</Typography>
            <Typography variant="body2">Atomic Mass: {first.atomicMass}</Typography>
          </Paper>
        </Box> */}
      </Box>
    </Section>
  )
}

function Element({ element, className }: { element: IPeriodicTableElementResponse, className?: string, sx?: SxProps<Theme> }) {
  return (
    <Tooltip title={element?.name} arrow key={element?.id}>
      <Box sx={{
        gridRowStart: element.ypos,
        gridColumnStart: element.xpos
      }} className={classNames(
        'w-full h-full aspect-square flex justify-center items-center',
        'hover:brightness-80 transition-all relative',
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
      )}>
        <Typography className='text-lg font-bold max-md:text-xs max-lg:text-md min-lg:text-xl'>
          {element ? element.symbol : ""}
        </Typography>
        <Typography className='text-[9px] min-xl:text-sm max-lg:hidden absolute bottom-0 w-full text-center'>
          {element ? Math.round(element.atomicMass * 1000) / 1000 : ""}
        </Typography>
        <Typography className='text-[9px] min-xl:text-sm max-lg:hidden absolute right-0 top-0 p-0.5 font-[inconsolata]'>
          {element.number}
        </Typography>
      </Box>
    </Tooltip>
  )
}