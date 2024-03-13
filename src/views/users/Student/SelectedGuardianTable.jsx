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



const SelectedGuardianTable = ({ tableData, updateTable }) => {

  const deleteItemFromItemsArray = (itemToDelete) => {
    const updatedTableData = tableData.filter((item) => itemToDelete.id !== item.id);

    updateTable(updatedTableData);
  };

  return (

    // <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>

    <TableContainer component={Paper} sx={{ maxHeight: 840, maxWidth: '100%', mt: 3, ml: 5 }}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              NAME
            </TableCell>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              GENDER
            </TableCell>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              EMAIL
            </TableCell>
            <TableCell align='center' sx={{ minWidth: 100 }}>
              PHONE
            </TableCell>
            <TableCell align='left' sx={{ minWidth: 100 }}>
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow className='text-center'>
              <TableCell align='center' colSpan={5}>
                Click on the + icon above to add guardian
              </TableCell>
            </TableRow>
          ) : (
            <Fragment>
              {tableData.map((item, i) => {

                return (
                  <TableRow hover role='checkbox' key={i}>
                    <TableCell align='center'>{`${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`}</TableCell>
                    <TableCell align='center'>{item?.gender}</TableCell>
                    <TableCell align='center'>{item?.email}</TableCell>
                    <TableCell align='center'>{item?.phone}</TableCell>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                      <IconButton size='small' onClick={() => deleteItemFromItemsArray(item)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    // </Box>
  );
};

export default SelectedGuardianTable;
