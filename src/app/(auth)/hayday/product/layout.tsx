import React from 'react'

interface HaydayProductProps {
  detail: React.ReactNode,
  children: React.ReactNode
}

export default function HaydayProduct(props: HaydayProductProps) {
  return (
    <div>
      {props.children}
      {props.detail}
    </div>
  )
}
