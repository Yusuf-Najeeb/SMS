import { roundToDecimalPlaces } from "../../../@core/utils/roundToDecimal"


const CustomReportCardSummary = ({reportCardData, numberOfSubjects}) => {

    const totalScore = reportCardData?.reduce((accumulator, currentValue)=> {
        return accumulator + currentValue?.total
    },0)

    const totalScoreRounded = roundToDecimalPlaces(2, totalScore)

    
    return (
      <table width={'100%'} style={{border: "1px solid #eeeeee", }} className='customReportTable affectiveTraitsTable'>
          <thead className='customTableHead'>
              <tr style={{height: '40px'}}>
                  <th align="center" colSpan={2} style={{paddingLeft: '2px', fontSize: '13px'}} >Report Summary</th>
              </tr>
          </thead>
          <tbody>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Overall Total Score</td>
          <td align="left" style={{fontWeight: 500}} >&nbsp;&nbsp; {`${totalScoreRounded} out of ${(100 * numberOfSubjects)}`} </td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Average Score</td>
          <td align="left" style={{fontWeight: 500}} >&nbsp;&nbsp;&nbsp;{`${(totalScoreRounded / numberOfSubjects)}` || '--' }</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Total Subjects Offered In Cass</td>
          <td align="left" style={{fontWeight: 500}} >&nbsp;&nbsp;&nbsp;{numberOfSubjects || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap">&nbsp;&nbsp;&nbsp;Total Subjects Taken</td>
          <td align="left" style={{fontWeight: 500}}>&nbsp;&nbsp;&nbsp;{numberOfSubjects || '--'}</td>
          </tr>
          <tr>
          <td nowrap="nowrap" align="center" style={{backgroundColor: '#333', color: '#fff'}} colSpan={2}>&nbsp;&nbsp;&nbsp; C.A: Continous Assessment <br /> Average Score = Total Score / Total Subjects Taken  </td>
          </tr>
       
          
          
              
          </tbody>
      </table>
    )
  }
  
  export default CustomReportCardSummary