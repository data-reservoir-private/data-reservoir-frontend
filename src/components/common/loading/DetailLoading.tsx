import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function DetailLoading() {
  return (
    <Box className='flex flex-col gap-3'>
      <Skeleton className='w-full h-10' variant='rounded'/>
      <Skeleton className='w-full h-2' variant='rounded' />
      <Skeleton className='w-full h-10' variant='rounded' />
      <Skeleton className='w-full h-2' variant='rounded' />

      {/* Image */}
      <Skeleton className='w-full h-80' variant='rounded' />

      {/* Info Table */}
      <Skeleton className='w-full h-10' variant='rounded' />
      <Skeleton className='w-full h-2' variant='rounded' />
      <Box className='w-full flex flex-col gap-2'>
        {
          new Array(5).fill(0).map((_, idx) => 
            <Box key={idx} className='flex gap-2 w-full'>
              <Skeleton className='w-[25%] h-8' variant='rounded'/>
              <Skeleton className='w-[75%] h-8' variant='rounded'/>
            </Box>
          )
        }
      </Box>

      {/* Dependency */}
      <Skeleton className='w-full h-10' variant='rounded' />
      <Skeleton className='w-full h-2' variant='rounded' />
      <Box className='grid grid-cols-3 grid-rows-2 gap-1'>
        {
          new Array(6).fill(0).map((_, idx) => 
            <Skeleton className='w-full h-20' variant='rounded' key={idx}/>
          )
        }
      </Box>
    </Box>
  )
}
