import React, { Dispatch, Fragment, SetStateAction } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';

import Icon from 'src/@core/components/icon';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';



const SearchedGuardianTable = ({ tableData }) => {


  return (

    // <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>

    <Fragment>
    <Typography sx={{ml: 6, mt: 6}}>Selected Guardian</Typography>

    <TableContainer component={Paper} sx={{ maxHeight: 840, maxWidth: '100%', mt: 3, ml: 5 }}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
          <TableCell align='center' sx={{ minWidth: 100 }}>
              S/N
            </TableCell>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              FIRST NAME
            </TableCell>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              LAST NAME
            </TableCell>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              GENDER
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow className='text-center'>
              <TableCell align='center' colSpan={5}>
                No items selected yet
              </TableCell>
            </TableRow>
          ) : (
            <Fragment>
              {tableData.map((item, i) => {

                return (
                  <TableRow hover role='checkbox' key={i}>
                    <TableCell align='center'>{i + 1}</TableCell>
                    <TableCell align='center'>{`${item.firstName.toUpperCase()} `}</TableCell>
                    <TableCell align='center'>{` ${item.lastName.toUpperCase()}`}</TableCell>
                    <TableCell align='center'>{item?.gender}</TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    </Fragment>
  );
};

export default SearchedGuardianTable;
