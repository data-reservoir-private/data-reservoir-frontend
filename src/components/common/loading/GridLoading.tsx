import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function GridLoading() {
  return (
    <Box className='flex flex-col gap-3'>
      <Skeleton className='w-full h-10' variant='rounded'/>
      <Skeleton className='w-full h-40' variant='rounded' />
      <Box className='flex flex-wrap justify-center gap-4'>
        {
          new Array(60).fill(0).map((_, idx) => 
            <Skeleton className='w-16 h-16' variant='rounded' key={idx}/>
          )
        }
      </Box>
    </Box>
  )
}
