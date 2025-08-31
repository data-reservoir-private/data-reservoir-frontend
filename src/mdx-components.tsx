import classNames from 'classnames'
import type { MDXComponents } from 'mdx/types'
import { inconsolata } from './app/layout'
import '@/app/code.css'
import Box from '@mui/material/Box'

const components: MDXComponents = {
  pre: ({ children }) => 
    <pre className={classNames('font-[inconsolata] bg-gray-900/40 p-2', inconsolata.className)}>{children}</pre>,
  wrapper: ({ children }) => 
    <Box className='mdx-root'>
      {children}
    </Box>
}

export function useMDXComponents(): MDXComponents {
  return components
}