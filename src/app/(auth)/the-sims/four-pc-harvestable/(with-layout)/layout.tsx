import React from 'react'

interface TheSimsFourPCHarvestableLayoutProps {
  children: React.ReactNode,
  detail: React.ReactNode
}

export default function TheSimsFourPCHarvestableLayout(props: TheSimsFourPCHarvestableLayoutProps) {
  return (
    <div className='flex h-full gap-5'>
      <div className='overflow-y-scroll scrollbar-default'>
        {props.children}
      </div>
      <div className='bg-bluish-200/60 min-w-[300px] h-full text-white rounded-md p-4 overflow-y-scroll scrollbar-none whitespace-pre-wrap'>
        {props.detail}
      </div>
    </div>
  )
}
