import DashboardClientPage from '@/components/app/dashboard/DashboardClientPage';
import { GetDashboardData } from '@/service/dashboard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard - Birdeye View'
};

export default async function DashboardPage() {
  const data = await GetDashboardData();

  return (<DashboardClientPage data={data}/>);
}
