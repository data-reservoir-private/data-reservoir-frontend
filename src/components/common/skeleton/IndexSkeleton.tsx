import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function IndexSkeleton() {
  return (
    <Box className='space-y-6'>

      <Skeleton variant='rounded' height={60} />
      <Skeleton variant='rounded' height={4} />

      <Grid container spacing='1rem' columns={{ xs: 1, md: 2 }}>
        <Grid size={1}>
          <Skeleton variant='rounded' height={120} />
        </Grid>
        <Grid size={1}>
          <Skeleton variant='rounded' height={120} />
        </Grid>
      </Grid>

      <Skeleton variant='rounded' height={400} />

      <Grid container spacing='1rem' columns={{ xs: 1, sm: 2, md: 3 }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid size={1} key={index}>
            <Skeleton variant='rounded' height={120} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
