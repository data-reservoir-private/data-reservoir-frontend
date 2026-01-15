import Box from '@mui/material/Box';
import classNames from 'classnames';
import { ReactNode } from 'react';

export default function Paper({children, className}: {children: ReactNode, className?: string}) {
  return (
    <Box component='div' className={classNames('bg-background-paper border-divider border-2 rounded-sm', className ?? "")}>
      {children}
    </Box>
  );
}
