'use client'

import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { BsCheck, BsCopy } from 'react-icons/bs'

export default function CopyButton({ value } : { value: string }) {

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if(copied) setTimeout(() => setCopied(false), 1000)
  }, [copied])

  const handleOnClick = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  }

  return (
    <Button
      size='small'
      color={copied ? 'success' : 'info'}
      variant={copied ? 'contained' : 'outlined'}
      onClick={handleOnClick}
      disabled={copied} 
    >
      { copied ? <BsCheck/> : <BsCopy />}
    </Button>
  )
}
