import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import { TypographyVariant } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import classNames from 'classnames'
import Link from 'next/link'
import React, { Suspense } from 'react'
import BackButton from '../BackButton'
import { IBreadcrumb } from '@/constant/breadcrumb'

interface SectionProps {
  variant: TypographyVariant,
  name: string,
  children: React.ReactNode,
  className?: string,
  breadcrumbs?: readonly IBreadcrumb[]
}

export default function Section(props: SectionProps) {
  return (
    <Box display='flex' gap={props.variant === 'h4' ? '1rem' : '.5rem'} flexDirection='column' className={classNames(props.className)}>
      {
        (props.breadcrumbs && props.breadcrumbs.length > 1) && (
          <Box className="flex gap-3">
            <BackButton/>
            <Breadcrumbs>
              {
                props.breadcrumbs.map((bc, idx) => (
                  <Box key={idx}>
                    {
                      bc.link ? (<Link className='hover:underline' href={bc.link}>{bc.label}</Link>) :
                        (<Typography className='text-white'>{bc.label}</Typography>)
                    }
                  </Box>
                )
                )
              }
            </Breadcrumbs>
          </Box>
        )
      }

      <Typography variant={props.variant} fontWeight='bold'>{props.name}</Typography>
      <Divider />
      {props.children}
    </Box>
  )
}
