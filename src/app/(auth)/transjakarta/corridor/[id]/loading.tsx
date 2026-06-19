import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
  return (
    <Box className='flex flex-col gap-4'>
      <Box className='flex items-center gap-3'>
        <Skeleton className='h-11 w-18' variant='rounded' />
        <Skeleton className='h-10 w-96 max-w-full' variant='rounded' />
      </Box>
      <Skeleton className='h-2 w-full' variant='rounded' />

      {
        new Array(2).fill(0).map((_, idx) => (
          <Box key={idx} className='flex gap-4 rounded-xl border border-neutral-200/20 p-4 max-md:flex-col'>
            <Skeleton className='h-220 w-90 shrink-0 max-md:h-72 max-md:w-full' variant='rounded' />

            <Box className='flex-1'>
              <Box className='flex flex-col gap-2'>
                {
                  new Array(5).fill(0).map((__, rowIdx) => (
                    <Box key={rowIdx} className='flex gap-2'>
                      <Skeleton className='h-8 w-[28%]' variant='rounded' />
                      <Skeleton className='h-8 w-[72%]' variant='rounded' />
                    </Box>
                  ))
                }
              </Box>
            </Box>
          </Box>
        ))
      }
    </Box>
  );
}