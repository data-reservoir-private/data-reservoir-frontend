import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(header)/_header/')({
  beforeLoad: () => {
    throw redirect({ to: '/dashboard' });
  }
});