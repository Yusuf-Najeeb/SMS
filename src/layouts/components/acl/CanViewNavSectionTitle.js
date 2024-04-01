// // ** React Imports
// import { useContext } from 'react'

// // ** Component Imports
// import { AbilityContext } from 'src/layouts/components/acl/Can'

// const CanViewNavSectionTitle = props => {
//   // ** Props
//     // ** Props
//     const { children } = props

//     // ** Hook
  
//       return <>{children}</>
    
// }

// export default CanViewNavSectionTitle


// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'



const CanViewNavSectionTitle = (props) => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const ability = useContext(AbilityContext)

  return <>{children}</>

  
  // if (navTitle && navTitle.auth === false) {
  // } else {
  //   return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
  // }
}

export default CanViewNavSectionTitle
