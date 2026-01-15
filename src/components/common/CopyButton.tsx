import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { BsCheck, BsCopy, BsX } from 'react-icons/bs'

export default function CopyButton({ value } : { value: string }) {
  const [copied, setCopied] = useState<'awaiting' | 'success' | 'failed'>('awaiting');

  useEffect(() => {
    if(copied !== 'awaiting') setTimeout(() => setCopied('awaiting'), 1000)
  }, [copied])

  const handleOnClick = () => {
    if ('clipboard' in navigator)
    {
      navigator.clipboard.writeText(value)
        .then(() => setCopied('success'))
        .catch(() => setCopied('failed'));
    }
    else setCopied('failed');
  }

  return (
    <Button
      title='Copy ID'
      size='small'
      color={copied === 'success' ? 'success' : copied === 'failed' ? 'error' : 'info'}
      variant={copied !== 'awaiting' ? 'contained' : 'outlined'}
      onClick={handleOnClick}
      disabled={copied !== 'awaiting'} 
    >
      { copied === 'success' ? <BsCheck/> : copied === 'failed' ? <BsX/> : <BsCopy />}
    </Button>
  )
}
