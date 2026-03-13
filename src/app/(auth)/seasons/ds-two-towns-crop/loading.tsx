import { Skeleton } from '@mui/material';

export default function Loading() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton height={40} />
      <Skeleton height={200} />
    </div>
  );
}
