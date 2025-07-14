import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { TypographyVariant } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import classNames from 'classnames'
import React from 'react'

interface SectionProps {
  variant: TypographyVariant,
  name: string,
  children: React.ReactNode,
  className?: string
}

export default function Section(props: SectionProps) {
  return (
    <Box display='flex' gap={ props.variant === 'h4' ? '1rem' : '.5rem' } flexDirection='column' className={classNames(props.className)}>
      <Typography variant={props.variant} fontWeight='bold'>{props.name}</Typography>
      <Divider />
      {props.children}
    </Box>
  )
}
