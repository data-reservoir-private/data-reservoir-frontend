import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import React from 'react';

interface SimplePageNavigationProps {
  currentPage: number,
  pageSize: number,
  totalData: number,
  pageSizeOptions?: number[]
  handleOnChangePage: (page: number) => void,
  handleOnChangeRowsPerPage: (page: number) => void,
}

export default function SimplePageNavigation(props: SimplePageNavigationProps) {
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    props.handleOnChangePage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const rowPerPage = parseInt(event.target.value);
    props.handleOnChangeRowsPerPage(rowPerPage);
  };

  return (
    <Box>
      <TablePagination
        component='div'
        rowsPerPageOptions={props.pageSizeOptions ?? [0, 25, 50, 100]}
        count={props.totalData}
        page={Math.max(0, props.currentPage - 1)}
        rowsPerPage={props.pageSize}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}
