import { useCustomFormContext } from '@/utilities/form';
import Button from '@mui/material/Button';
import React from 'react'

export default function SimpleSubmitButton({ label = "Submit", meta }: { label: string, meta?: object }) {
  const form = useCustomFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit"
          variant="contained"
          disabled={isSubmitting}
          onClick={e => { e.preventDefault(); form.handleSubmit(meta); }}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
