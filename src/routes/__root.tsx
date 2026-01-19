import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { createRootRoute, Scripts, HeadContent, Outlet } from "@tanstack/react-router";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import globalCss from "@/globals.css?url";
import { CssBaseline } from "@mui/material";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import React from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: globalCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      }
    ],
  }),
  component: Component
});

function Component() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: 'css' });
  return (
    <ClerkProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ClerkProvider>
  )
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
