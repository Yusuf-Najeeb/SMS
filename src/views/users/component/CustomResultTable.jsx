import React from 'react'

const CustomResultTable = ({tableData,positionArray, studentId}) => {

    
  return (
    <table width={'100%'} style={{border: "1px solid #eeeeee", }} className='customReportTable'>
        <thead className='customTableHead'>
            <tr style={{height: '40px'}}>
                <th align="left" style={{paddingLeft: '2px'}} >SUBJECT</th>
                <th align="left" style={{paddingLeft: '2px'}}>C.A 1</th>
                <th align="left" style={{paddingLeft: '2px'}}>C.A 2</th>
                <th align="left" style={{paddingLeft: '2px'}}>Assignment 1</th>
                <th align="left" style={{paddingLeft: '2px'}}>Assignment 2</th>
                <th align="left" style={{paddingLeft: '2px'}}>Class Exercise</th>
                <th align="left" style={{paddingLeft: '2px'}}>Project</th>
                <th align="left" style={{paddingLeft: '2px'}}>Exam</th>
                <th align="left" style={{paddingLeft: '2px'}}>Class Highest Score</th>
                <th align="left" style={{paddingLeft: '2px'}}>Class Lowest Score</th>
                <th align="left" style={{paddingLeft: '2px'}}>Total Score (100%)</th>
                <th align="left" style={{paddingLeft: '2px'}}>Subject Position</th>
                <th align="left" style={{paddingLeft: '2px'}}>Grade</th>
                <th align="left" style={{paddingLeft: '2px'}}>Remark</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((data,i)=>{
                const FirstAssignment = data?.result?.find(res => res.category == 'Assignment 1')
                const SecondAssignment = data?.result?.find(res => res.category == 'Assignment 2')
                const FirstCA = data?.result?.find(res => res.category == 'continuous assessment 1')
                const SecondCA = data?.result?.find(res => res.category == 'continuous assessment 2')
                const ClassExercise = data?.result?.find(res => res.category == 'class exercise')
                const Exam = data?.result?.find(res => res.category == 'Final exam')
                const Project = data?.result?.find(res => res.category == 'project / practical')
                const subjectPosition = positionArray[0]?.position?.find((pos)=> pos.student == studentId)


                return (
                    <tr key={i}>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000', minHeight: '40px'}}>{data.subject || '--'}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{FirstCA?.score || '--'}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{SecondCA?.score || '--'}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{FirstAssignment?.score || '--'}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{SecondAssignment?.score || '--'}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{ClassExercise?.score || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{Project?.score || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{Exam?.score || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{positionArray[0]?.highestscore || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{positionArray[0]?.lowestscore || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{data?.total || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{subjectPosition?.position || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{data?.grade || '--'}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{data?.remark || '--'}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default CustomResultTable