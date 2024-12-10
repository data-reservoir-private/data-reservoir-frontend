import QuartzClientPage from '@/components/app/quartz/QuartzClientPage'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Quartz - Birdeye View'
}

export default function FarmFrenzyPage() {
  return (<QuartzClientPage/>)
}
