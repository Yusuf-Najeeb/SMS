

const CustomGradingSystem = ({ClassGradingParameters}) => {

    
    return (
      <table width={'100%'} style={{border: "1px solid #eeeeee", }} className='customReportTable affectiveTraitsTable'>
          <thead className='customTableHead'>
              <tr style={{height: '40px'}}>
                  <th align="center" colSpan={2} style={{paddingLeft: '2px', fontSize: '13px'}} >Grading System</th>
              </tr>
          </thead>
          <tbody>

            {ClassGradingParameters?.map((item)=> {
                return (
                    <tr key={item?.id}>
                    <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;{item?.percentage || '--'} </td>
                    <td align="left" style={{fontWeight: 500}}> &nbsp;&nbsp;&nbsp;{item?.name?.toUpperCase() || '--'} </td>
                    </tr>  
                )
            })}
         
       
          
          
              
          </tbody>
      </table>
    )
  }
  
  export default CustomGradingSystem