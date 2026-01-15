import AuthLayout from "@/components/common/auth-layout/AuthLayout";
import { SignedIn, SignIn } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute('/(header)/_header')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <SignedIn>
      <AuthLayout />
      <Box className='relative min-sm:left-[250px] min-sm:w-[calc(100%-250px)] p-2 min-h-[100svh]'>
        <Toolbar variant='dense' />
        <Box className='p-4'>
          <Outlet />
        </Box>
      </Box>
    </SignedIn>
  )
}
