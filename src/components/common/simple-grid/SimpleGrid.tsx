import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import React from 'react'
import Paper from '../paper/Paper'
import SimpleImage from '../SimpleImage'
import classNames from 'classnames'
import Typography from '@mui/material/Typography'

interface SimpleGridProps<TData extends { id: string, name: string, image: string }> {
  data: TData[],
  link: string,
  boxClassName?: string,
  columns?: number
}

export default function SimpleGrid<TData extends { id: string, name: string, image: string }>(props: SimpleGridProps<TData>) {
  return (
    <>
      {
        props.data.length === 0 && (
          <Box className="w-full flex flex-col items-center justify-center gap-3 p-3">
            <Typography variant='h4' className='text-white/30'>😭</Typography>
            <Typography variant='h4' className='text-white/30'>No Data</Typography>
          </Box>
        )
      }
      {
        props.data.length > 0 && (
          <Grid container spacing='1rem' columns={props.columns ?? 12} className="justify-evenly">
            {
              props.data.map((d) => (
                <Grid key={d.id}>
                  <Link passHref href={`${props.link}/${d.id}`}>
                    <Paper className='p-1 flex relative'>
                      <Box className={classNames('w-20 h-20 relative', props.boxClassName)}>
                        <SimpleImage src={d.image} alt={d.name} className='rounded-sm h-auto object-contain' />
                      </Box>
                    </Paper>
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        )
      }
    </>
  )
}
