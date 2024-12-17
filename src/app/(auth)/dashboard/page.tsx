import DashboardClientPage from '@/components/app/dashboard/DashboardClientPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard - Birdeye View'
};

export default function DashboardPage() {
  return (<DashboardClientPage/>);
}
