'use client'

import { useAppStore } from '@/store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

export default function QueryComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useAppStore(x => [x.query.queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
