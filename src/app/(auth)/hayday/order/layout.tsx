import Section from '@/components/common/paper/Section'
import { BREADCRUMBS } from '@/constant/breadcrumb'
import React from 'react'

interface HaydayOrderLayoutProps {
  summary: React.ReactNode,
  children: React.ReactNode,
  distribution: React.ReactNode,
  valuable: React.ReactNode,
  weekly: React.ReactNode,
  daily: React.ReactNode,
  client: React.ReactNode,
  product: React.ReactNode
}

export default function HaydayOrderLayout(props: HaydayOrderLayoutProps) {
  return (
    <Section name='Hayday Orders' variant='h4' breadcrumbs={BREADCRUMBS['hayday-order']}>
      {props.children}

      <Section name='Summary' variant='h6'>
        {props.summary}
      </Section>

      {props.weekly}
      {props.daily}

      <Section name='Distribution' variant='h6'>
        {props.distribution}
      </Section>

      <Section name='Clients' variant='h6'>
        {props.client}
      </Section>

      <Section name='Top 10 Orders' variant='h6'>
        {props.valuable}
      </Section>

      <Section name='Top 50 Products' variant='h6'>
        {props.product}
      </Section>
    </Section>
  )
}
