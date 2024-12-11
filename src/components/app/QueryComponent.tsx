'use client';

import { useAppStore } from '@/store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useShallow } from 'zustand/react/shallow'


export default function QueryComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useAppStore(useShallow(x => [x.query.queryClient]));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
