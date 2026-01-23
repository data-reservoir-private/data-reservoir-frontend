import type { Metadata } from "next";
import { PT_Sans, Inconsolata } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "@/theme";
import classNames from "classnames";
import { ClerkProvider } from '@clerk/nextjs';

import "./globals.css";

const ptSansFont = PT_Sans({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });
export const inconsolata = Inconsolata({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "Data Reservoir",
  description: "Places where you can see mined data structured in (somewhat) tabular format. Perfect for data seeding or just observability."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossOrigin="anonymous"></link>
        <link rel="icon" type="image/svg+xml" href="favicon.svg"></link>
      </head>
      <html lang="en" suppressHydrationWarning>
        <body className={classNames(ptSansFont.className, inconsolata.className)}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={themeOptions}>
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
