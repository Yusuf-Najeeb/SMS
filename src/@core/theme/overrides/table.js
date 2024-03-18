
import { useRouter } from 'next/router';


const Table = () => {
const router = useRouter()


  return {
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.shadows[0],
          borderTopColor: theme.palette.divider,
          backgroundColor: router?.pathname == "/apps/result-manager" && '#fff'
        })
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'uppercase',
          '& .MuiTableCell-head': {
            fontWeight: 500,
            letterSpacing: '1px',
            fontSize: theme.typography.body2.fontSize
          }
        })
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiTableCell-body': {
            letterSpacing: '0.25px',
            color: theme.palette.text.secondary,
            color: router?.pathname == "/apps/result-manager" && '#666',
            '&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)': {
              paddingTop: router?.pathname == "/apps/result-manager" ? theme.spacing(2.5) : theme.spacing(3.5),
              paddingBottom: router?.pathname == "/apps/result-manager" ? theme.spacing(2.5) : theme.spacing(3.5),
              color: router?.pathname == "/apps/result-manager" && '#666'
            }
          }
        })
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiTableCell-head:not(.MuiTableCell-paddingCheckbox):first-child, & .MuiTableCell-root:not(.MuiTableCell-paddingCheckbox):first-child ':
            {
              paddingLeft: theme.spacing(6),
              
            },
          '& .MuiTableCell-head:last-child, & .MuiTableCell-root:last-child': {
            paddingRight: theme.spacing(6)
          },
          
          // '& .css-16u3ru3-MuiTableRow-root, & .MuiTableCell-root:last-child': {
          //   border: '1px solid red'
          // },
          

        })
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: router?.pathname == "/apps/result-manager" ? '1px solid #eee' : `1px solid ${theme.palette.divider}`
        }),
        paddingCheckbox: ({ theme }) => ({
          paddingLeft: theme.spacing(3.25)
        }),
        stickyHeader: ({ theme }) => ({
          backgroundColor: router?.pathname == "/apps/result-manager" ? '#333333' : theme.palette.customColors.tableHeaderBg,
          color: router?.pathname == "/apps/result-manager" && '#fff'
        })
      }
    }
  }
}

export default Table
