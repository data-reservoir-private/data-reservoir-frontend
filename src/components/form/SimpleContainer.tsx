import { useCustomFormContext } from '@/utilities/form';
import Box from '@mui/material/Box';
import classNames from 'classnames';
import { ReactNode } from 'react';

export default function SimpleContainer({ className = "", children }: { className?: string, children: ReactNode }) {
  const form = useCustomFormContext()
  return (
    <Box
      component='form'
      className={classNames(className)}
      onSubmit={e => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }}
    >
      {children}
    </Box>
  )
}
