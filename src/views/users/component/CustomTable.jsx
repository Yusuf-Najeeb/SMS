import React from 'react'

const CustomTable = ({tableData, sessionData}) => {
  return (
    <table width={'100%'} className='customTable'>
        <thead className='customTableHead'>
            <tr style={{height: '30px'}}>
                <th align="left" style={{paddingLeft: '2px'}} >SUBJECT</th>
                <th align="left" style={{paddingLeft: '2px'}}>CLASS</th>
                <th align="left" style={{paddingLeft: '2px'}}>SCORE</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((data,i)=>{

                return (
                    <tr key={i}>
                        <td align="left"  style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{data.subject}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{sessionData.class}</td>
                        <td align="left" style={{textTransform:'uppercase', paddingLeft: '2px', color: '#000'}}>{data.score}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default CustomTable