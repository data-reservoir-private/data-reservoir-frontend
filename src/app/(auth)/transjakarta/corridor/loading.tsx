import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const categoryItemCounts = [10, 8, 7, 6];

export default function Loading() {
  return (
    <Box className='flex flex-col gap-4'>
      <Skeleton className='h-10 w-88 max-w-full' variant='rounded' />
      <Skeleton className='h-2 w-full' variant='rounded' />

      {
        categoryItemCounts.map((itemCount, index) => (
          <Box key={index} className='rounded-xl border border-neutral-200/20 p-4'>
            <Skeleton className='h-8 w-52 max-w-full' variant='rounded' />
            <Box className='mt-4 flex flex-wrap gap-4'>
              {
                new Array(itemCount).fill(0).map((_, itemIndex) => (
                  <Skeleton key={itemIndex} className='h-14 w-20' variant='rounded' />
                ))
              }
            </Box>
          </Box>
        ))
      }
    </Box>
  );
}