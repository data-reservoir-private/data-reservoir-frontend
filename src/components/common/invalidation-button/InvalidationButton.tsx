'use client';

import { invalidateHayday, invalidateTransaction } from "@/app/(auth)/cache/action";
import { useAppForm } from "@/utilities/form";
import { useActionState, useEffect, useState } from "react";
import { mergeForm, useSelector, useTransform } from '@tanstack/react-form-nextjs';
import { Button } from "@mui/material";
import { BsCheck } from "react-icons/bs";

export default function InvalidationButton(props: { type: 'hayday' | 'transaction' }) {
  const [state, action] = useActionState(
    props.type === 'hayday' ? invalidateHayday : invalidateTransaction,
    null
  );

  const [copied, setCopied] = useState<'awaiting' | 'success'>('awaiting');
  const fs = useAppForm({
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });
  const t = useSelector(fs.store, (s) => ({
    isSubmitting: s.isSubmitting,
    isSubmitSuccessful: s.isSubmitSuccessful
  }));
  
  useEffect(() => {
    if (t.isSubmitting) setCopied('awaiting');
    else if (t.isSubmitSuccessful) { 
      setCopied('success');
      setTimeout(() => setCopied('awaiting'), 1000);
    }
  }, [t]);
  
  return (
    <fs.AppForm>
      <form action={action as never} onSubmit={() => fs.handleSubmit()}>
        <Button
          type="submit"
          variant="contained"
          disabled={copied === 'success'}
          className="w-42 h-8"
        >
          {copied === 'success' ? <BsCheck /> : 'Invalidate Cache'}
        </Button>
      </form>
    </fs.AppForm>
  );
}