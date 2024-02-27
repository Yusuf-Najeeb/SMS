import React, { Fragment, useState, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { Card, CardHeader, Icon, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import NoData from 'src/@core/components/emptydata/NoData'
import CustomSpinner from 'src/@core/components/custom-spinner'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getStudentsUnderGuardian } from '../../../store/apps/guardian/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useAppDispatch } from 'src/hooks'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { formatDate } from '../../../@core/utils/format'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const renderClient = row => {
  const initials = `${row.firstName} ${row.lastName}`
  if (row.profilePicture?.length) {
    return (
      <CustomAvatar
        src={`${backendURL?.replace('api', '')}/${row.profilePicture}`}
        sx={{ mr: 2.5, width: 32, height: 32 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'

        // color={row?.title.length > 2 ? 'primary' : 'secondary'}
        color='primary'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const WardTable = ({user}) => {

    const dispatch = useAppDispatch()

  const [ClassesList] = useClasses()

    const [wardData, setWard] = useState(0)
    const [loading, setLoading]= useState(false)

    useEffect(() => {
        dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


    useEffect(()=>{
        if(user){
            setLoading(true)
            getStudentsUnderGuardian(user?.email).then((res)=>{
                if(res?.data.success){
                    setLoading(false)
                    setWard(res?.data.data)
                }
            }).catch(()=>{
                setLoading(false)
            })
        }
      },[user])

  return (

    <Card>
    <CardHeader
      title='Student'
      titleTypographyProps={{ sx: { mb: [2, 0] } }}

    //   action={<CustomTextField value={value} placeholder='Search' onChange={e => handleFilter(e.target.value)} />}
      sx={{
        py: 4,
        flexDirection: ['column', 'row'],
        '& .MuiCardHeader-action': { m: 0 },
        alignItems: ['flex-start', 'center']
      }}
    />


    <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 250 }}>
                Student
                </TableCell>
                {/* <TableCell align='center' sx={{ minWidth: 150 }}>
                Religion
              </TableCell> */}
                <TableCell align='left' sx={{ minWidth: 160 }}>
                  Class
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Date of Birth
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Gender
                </TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow className='text-center'>
                  <TableCell colSpan={6}>
                    <CustomSpinner />
                  </TableCell>
                </TableRow>
              ) : (

                <Fragment>
                  {wardData?.length &&
                    wardData.map(item => {
                      const className = ClassesList.find(c => c.id === item.classId)

                      return (
                        <TableRow hover role='checkbox' key={item.id}>
                          <TableCell align='left' sx={{ display: 'flex', gap: '10px' }}>
                            {renderClient(item)}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                {`${item?.firstName} ${item?.lastName}`}
                              </Typography>
                              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                {item?.email || '--'}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                            {`${className.name} ${className.type}` || '--'}
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {formatDate(item.dateOfBirth) || '--'}
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item?.gender || '--'}
                          </TableCell>

                        </TableRow>
                      )
                    })}

                  {wardData?.length === 0 && (
                    <tr className='text-center'>
                      <td colSpan={6}>
                        <NoData />
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>

    </Card>
  )
}

export default WardTable