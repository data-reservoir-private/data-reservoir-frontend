import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '../paper/Paper'
import SimpleImage from '../SimpleImage'
import classNames from 'classnames'
import Typography from '@mui/material/Typography'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@mui/material'

interface SimpleGridProps<TData extends { id: string, name: string, image: string }> {
  data: TData[],
  link: string,
  boxClassName?: string,
  columns?: number,
  unoptimizedImage?: boolean,
  pixelated?: boolean,
  isLoading?: boolean,
}

export default function SimpleGrid<TData extends { id: string, name: string, image: string }>(props: SimpleGridProps<TData>) {
  return (
    <>
      {
        !!props.isLoading && (
          <Skeleton className='w-full h-72'/>
        )
      }
      {
        (!props.isLoading && props.data.length === 0) && (
          <Box className="w-full flex flex-col items-center justify-center gap-3 p-3">
            <Typography variant='h4' className='text-white/30'>😭</Typography>
            <Typography variant='h4' className='text-white/30'>No Data</Typography>
          </Box>
        )
      }
      {
        props.data.length > 0 && (
          <Grid container className="justify-evenly gap-1 max-md:gap-2 grid-cols-12">
            {
              props.data.map((d) => (
                <Grid key={d.id}>
                  <Link to={`${props.link}/${d.id}`} title={d.name}>
                    <Paper className='p-1 flex relative'>
                      <Box className={classNames('w-20 h-20 relative', props.boxClassName)}>
                        <SimpleImage
                          src={d.image}
                          alt={d.name}
                          className='rounded-sm h-auto object-contain'
                          unoptimized={props.unoptimizedImage}
                          pixelated={props.pixelated}
                        />
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
