

const CustomPsychomotorSkillsTable = ({skills}) => {

    
    return (
      <table width={'100%'} style={{border: "1px solid #eeeeee", }} className='customReportTable affectiveTraitsTable'>
          <thead className='customTableHead'>
              <tr style={{height: '40px'}}>
                  <th align="left" style={{paddingLeft: '2px', fontSize: '13px'}} >PSYCHOMOTOR SKILLS</th>
                  <th align="left" style={{paddingLeft: '2px'}} ></th>
              </tr>
          </thead>
          <tbody>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Reading</td>
          <td align="center" >{skills?.reading || '--'} </td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Verbal Fluency/Diction</td>
          <td align="center" >{skills?.verbal_fluency_diction || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Handwriting</td>
          <td align="center" >{skills?.handwriting || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Musical Skills</td>
          <td align="center" >{skills?.musical_skills || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Creative Arts</td>
          <td align="center" class="">{skills?.creative_arts || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Physical Education</td>
          <td align="center" >{skills?.physical_education || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;General Reasoning</td>
          <td align="center" style={{paddingLeft: '5px', paddingRight: '5px'}}>{skills?.general_reasoning || '--'}</td>
          </tr>
          
          
              
          </tbody>
      </table>
    )
  }
  
  export default CustomPsychomotorSkillsTable