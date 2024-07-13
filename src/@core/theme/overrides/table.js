
import { useRouter } from 'next/router';


const Table = () => {
const router = useRouter()


  return {
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.shadows[0],
          borderTopColor: theme.palette.divider,
          borderSpacing: 1
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
            fontSize: theme.typography.body2.fontSize,
            borderSpacing: 1
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
            '&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)': {
              paddingTop: theme.spacing(3.5),
              paddingBottom: theme.spacing(3.5),
              borderSpacing: 1
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
          borderBottom:  `1px solid ${theme.palette.divider}`,

          // borderSpacing: router?.pathname == "/apps/result-manager" && 1,
          borderCollapse:  'collapse',

          minHeight: (router?.pathname == "/apps/cbt" || router?.pathname == "/apps/applicantCBT" ) && '120px',
        }),
        paddingCheckbox: ({ theme }) => ({
          paddingLeft: theme.spacing(3.25)
        }),
        stickyHeader: ({ theme }) => ({
          backgroundColor: theme.palette.customColors.tableHeaderBg,
          color: '#fff'
        })
      }
    }
  }
}

export default Table
