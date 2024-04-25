

const CustomAffectiveTraitsTable = ({traits}) => {

    
  return (
    <table width={'100%'} style={{border: "1px solid #eeeeee", }} className='customReportTable affectiveTraitsTable'>
        <thead className='customTableHead'>
            <tr style={{height: '40px'}}>
                <th align="center" style={{paddingLeft: '2px', fontSize: '13px'}} >AFFECTIVE TRAITS</th>
                <th align="left" style={{paddingLeft: '2px'}} ></th>
            </tr>
        </thead>
        <tbody>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Punctuality</td>
        <td align="center" >{traits?.punctuality || '--'} </td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Mental Alertness</td>
        <td align="center" >{traits?.mentalAlertness || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Attentiveness</td>
        <td align="center" >{traits?.attentiveness || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Respect</td>
        <td align="center" >{traits?.respect || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Neatness</td>
        <td align="center" >{traits?.neatness || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Politeness</td>
        <td align="center" class="">{traits?.politeness || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Honesty</td>
        <td align="center" >{traits?.honesty || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Relationship with peers</td>
        <td align="center" >{traits?.relating_with_peers || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Attitude to School</td>
        <td align="center" >{traits?.attitude_to_school || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Spirit of Team Work</td>
        <td align="center" style={{paddingLeft: '5px', paddingRight: '5px'}}>{traits?.spirit_of_team_work || '--'}</td>
        </tr>
        <tr>
        <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Completes School Work</td>
        <td align="center" >{traits?.completes_school_work_promptly || '--'}</td>
        </tr>
        
            
        </tbody>
    </table>
  )
}

export default CustomAffectiveTraitsTable