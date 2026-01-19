import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '../paper/Paper'
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
          <Box className='flex flex-wrap gap-2 justify-evenly'>
            {
              (new Array(60).fill(0)).map((_, idx) => <Skeleton key={idx} variant='rounded' className='h-12 w-12' />)
            }
          </Box>
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
          <Paper className='p-2'>
            <Grid container className="justify-evenly gap-1 max-md:gap-2 grid-cols-12">
              {
                props.data.map((d) => (
                  <Grid key={d.id}>
                    <Link to={`${props.link}/${d.id}`} title={d.name}>
                      <Box className={classNames('p-1 flex w-16 h-16 hover:outline-2 hover:outline-white/30 hover:rounded', props.boxClassName)}>
                        <img
                          src={d.image}
                          alt={d.name}
                          className='object-contain w-full h-full'
                        />
                      </Box>
                    </Link>
                  </Grid>
                ))
              }
            </Grid>
          </Paper>
          // <Grid container className="justify-evenly gap-1 max-md:gap-2 grid-cols-12">
          //   {
          //     props.data.map((d) => (
          //       <Grid key={d.id}>
          //         <Link to={`${props.link}/${d.id}`} title={d.name}>
          //           <Paper className={classNames('p-1 flex w-16 h-16', props.boxClassName)}>
          //             <img
          //               src={d.image}
          //               alt={d.name}
          //               className='object-contain w-full h-full'
          //             />
          //           </Paper>
          //         </Link>
          //       </Grid>
          //     ))
          //   }
          // </Grid>
        )
      }
    </>
  )
}
