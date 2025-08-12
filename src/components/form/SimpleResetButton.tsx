import { useCustomFormContext } from '@/utilities/form';
import Button from '@mui/material/Button';
import React from 'react'

export default function SimpleResetButton({ label = "Reset" }: { label: string }) {
  const form = useCustomFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="reset"
          variant="contained"
          color='error'
          disabled={isSubmitting}
          onClick={e => { e.preventDefault(); form.reset(); }}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
