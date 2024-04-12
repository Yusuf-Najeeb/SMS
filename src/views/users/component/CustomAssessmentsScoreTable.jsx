import React from 'react'

const CustomScoreSheetTable = ({tableData, StudentData, ClassesList, SubjectsList }) => {
  return (
    <table width={'100%'} className='customTable'>
        <thead className='customTableHead'>
            <tr style={{height: '30px'}}>
                <th align="left" style={{paddingLeft: '2px'}} >STUDENT</th>
                {/* <th align="left" style={{paddingLeft: '2px'}}>CLASS</th> */}
                {/* <th align="left" style={{paddingLeft: '2px'}}>SUBJECT</th> */}
                <th align="left" style={{paddingLeft: '2px'}}>C.A 1</th>
                <th align="left" style={{paddingLeft: '2px'}}>C.A 2</th>
                <th align="left" style={{paddingLeft: '2px'}}>Assignment 1</th>
                <th align="left" style={{paddingLeft: '2px'}}>Assignment 2</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((data,i)=>{

                const Student = StudentData?.result?.find((student)=> student.id == data.studentId)
                const StudentClass = ClassesList?.find((classRoom)=> classRoom.id == data.classId)
                const Subject = SubjectsList?.find((subject)=> subject.id == data.subjectId)

                return (
                    <tr key={i}>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{`${Student.firstName} ${Student.lastName}`}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{`${StudentClass.name} ${StudentClass.type}`}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{`${Subject.name}`}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{data.score}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default CustomScoreSheetTable