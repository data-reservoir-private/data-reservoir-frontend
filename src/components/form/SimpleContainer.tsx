import { useCustomFormContext } from '@/utilities/form';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import React from 'react'

export default function SimpleContainer({ className, children }: { className: string, children: React.ReactNode }) {
  const form = useCustomFormContext();
  return (
    <Box component='form' onSubmit={e => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }} className={className}>
      {children}
    </Box>
  )
}
