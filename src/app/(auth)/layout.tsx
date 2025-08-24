import React from 'react';
import AuthLayout from '@/components/common/auth-layout/AuthLayout';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}
