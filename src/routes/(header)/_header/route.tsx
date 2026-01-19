import AuthLayout from "@/components/common/auth-layout/AuthLayout";
import { SignedIn, SignIn } from "@clerk/tanstack-react-start";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/(header)/_header')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <SignedIn>
      <AuthLayout />
      <Box className='relative sm:left-62.5 sm:w-[calc(100%-250px)] p-2 min-h-svh'>
        <Toolbar variant='dense' />
        <Box className='p-4'>
          <Outlet />
        </Box>
      </Box>
    </SignedIn>
  )
}
