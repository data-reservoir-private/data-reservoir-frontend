import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import Paper from '../paper/Paper'
import SimpleImage from '../SimpleImage'
import classNames from 'classnames'
import Typography from '@mui/material/Typography'
import { Route } from 'next'

interface SimpleGridProps<TData extends { id: string, name: string, image: string }> {
  data: TData[],
  link: Route,
  boxClassName?: string,
  columns?: number,
  unoptimizedImage?: boolean,
  pixelated?: boolean
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
          <Paper className='p-2'>
            <Box className="flex flex-wrap gap-2 max-md:gap-2 grid-cols-12">
              {
                props.data.map((d) => (
                  <Box key={d.id}>
                    <Link passHref href={`${props.link}/${d.id}` as Route} title={d.name}>
                      <Box className={classNames('w-20 h-20 max-md:w-14 max-md:h-14 relative rounded hover:outline-2 hover:outline-white/15', props.boxClassName)}>
                        <SimpleImage
                          src={d.image}
                          alt={d.name}
                          className='rounded-sm h-auto object-contain'
                          unoptimized={props.unoptimizedImage}
                          pixelated={props.pixelated}
                        />
                      </Box>
                    </Link>
                  </Box>
                ))
              }
            </Box>
          </Paper>
          // <Paper className='p-2'>
          //   <Grid container className="justify-evenly gap-1 max-md:gap-2 grid-cols-12">
          //     {
          //       props.data.map((d) => (
          //         <Grid key={d.id}>
          //           <Link passHref href={`${props.link}/${d.id}` as Route} title={d.name}>
          //             <Box className={classNames('w-16 h-16 relative rounded hover:outline-2 hover:outline-white/15', props.boxClassName)}>
          //               <SimpleImage
          //                 src={d.image}
          //                 alt={d.name}
          //                 className='rounded-sm h-auto object-contain'
          //                 unoptimized={props.unoptimizedImage}
          //                 pixelated={props.pixelated}
          //               />
          //             </Box>
          //           </Link>
          //         </Grid>
          //       ))
          //     }
          //   </Grid>
          // </Paper>
          // <Grid container className="justify-evenly gap-1 max-md:gap-2 grid-cols-12">
          //   {
          //     props.data.map((d) => (
          //       <Grid key={d.id}>
          //         <Link passHref href={`${props.link}/${d.id}` as Route} title={d.name}>
          //           <Paper className='p-1 flex relative'>
          //             <Box className={classNames('w-20 h-20 relative', props.boxClassName)}>
          //               <SimpleImage
          //                 src={d.image}
          //                 alt={d.name}
          //                 className='rounded-sm h-auto object-contain'
          //                 unoptimized={props.unoptimizedImage}
          //                 pixelated={props.pixelated}
          //               />
          //             </Box>
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
