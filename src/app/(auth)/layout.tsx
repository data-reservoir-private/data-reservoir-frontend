import React from 'react';
import AuthLayout from '@/components/common/auth-layout/AuthLayout';
import { SignedIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const user = await currentUser();
  if (!user) redirect('/login');

  return (
    <>
      <SignedIn>
        <AuthLayout>
          {children}
        </AuthLayout>
      </SignedIn>
    </>
  )
}
