import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(header)/_header/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Dashboard Here</div>
}
