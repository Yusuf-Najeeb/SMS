
import ResultsTab from '../../../views/users/ResultManager/ResultTabs'


const ResultManager = ({ tab }) => {
  return <ResultsTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'scores' } },
      
    //   { params: { tab: 'deductions' } },
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default ResultManager
