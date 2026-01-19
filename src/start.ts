import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { createStart } from '@tanstack/react-start'
import { useRuntimeConfig } from "nitro/runtime-config";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [clerkMiddleware()],
  }
});