// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import { useEffect, useState } from 'react'
import { fetchTeacherSubjects } from '../../../store/apps/staff/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'



const TeacherSubjects = ({user}) => {


  const [CategoriesData] = useCategories()

    const [Subjects, setSubjects] = useState([])

    useEffect(()=>{
        if(user){
            

            fetchTeacherSubjects(user?.email).then((res)=>{
                if(res?.data.success){
                    setSubjects(res?.data.data)
                }
            })


        }

      },[user])

  return (
    <Card>
      <CardHeader
        title='Subjects'

        // subheader='38.4k Visitors'

        // action={
        //   <OptionsMenu
        //     options={['Last Week', 'Last Month', 'Last Year']}
        //     iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
        //   />
        // }
      />
      <CardContent>


        {Subjects?.map((item, index) => {

           const subjectCategory = CategoriesData.find(c => c.id === item.categoryId)

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== Subjects?.length - 1 ? [6.25, 6.25, 5.5, 6.25] : undefined
              }}
            >
              <Avatar variant='rounded' sx={{ mr: 4, width: 34, height: 34 }}>
                <Icon icon="tabler:shadow" />
              </Avatar>
              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 4,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant='h6' sx={{textTransform: 'uppercase'}}>{item.name}</Typography>

                  {/* <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    {item.subtitle}
                  </Typography> */}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                  {/* <Typography sx={{ mr: 4, color: 'text.secondary' }}>{item.amount}</Typography> */}

                  <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    sx={{ lineHeight: 1 }}
                    color={item.categoryId % 2 === 0 ? 'error' : 'success'}

                    // label={`${item.trend === 'negative' ? '-' : '+'}${item.trendNumber}%`}
                    label={subjectCategory?.name}
                  />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TeacherSubjects
