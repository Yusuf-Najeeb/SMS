import React from 'react'

const CustomApplicantCBTResultTable = ({tableData}) => {

    
  return (
    <table width={'100%'} style={{border: "1px solid #eeeeee", }} className='customReportTable'>
        <thead className='customTableHead'>
            <tr style={{height: '40px'}}>
                <th align="left" style={{paddingLeft: '2px'}} >S/N</th>
                <th align="left" style={{paddingLeft: '2px'}} >SUBJECT</th>
                <th align="left" style={{paddingLeft: '2px'}}>Score</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((data,i)=>{


                return (
                    <tr key={i}>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{i+1}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000', minHeight: '40px'}}>{data?.subject?.name || '--'}</td>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{`${data?.applicantScore} / ${data?.score}`}</td>

                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default CustomApplicantCBTResultTable