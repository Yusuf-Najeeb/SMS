// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  console.log(auth, 'auth')

  // ** Vars
  let ability
  useEffect(() => {
    if (auth.user && auth.user.role.name && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(auth.user.role.name)
      router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
     console.log('no ability')
    ability = buildAbilityFor(auth.user.role.name, aclAbilities.subject)
    if (router.route === '/dashboard') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }


   // Check the access of current user and render pages
   if (ability && auth.user.role.name == 'accountant' && ability.can(aclAbilities.action, aclAbilities.subject)) {
    // Here, you can specify the routes a user can visit based on their role
    const allowedRoutes = ['/dashboard', '/apps/payroll', '/apps/income', '/apps/expenditure', '/apps/payment-methods']
    if (allowedRoutes.includes(router.route)) {
      if (router.route === '/') {
        return <Spinner />
      }

      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return (
        <BlankLayout>
          <NotAuthorized />
        </BlankLayout>
      )
    }
  }

    //  // Check the access of current user and render pages
    //  if (ability && auth.user.role.name == 'parent' && ability.can(aclAbilities.action, aclAbilities.subject)) {
    //     // Here, you can specify the routes a user can visit based on their role
    //     const allowedRoutes = ['/dashboard', ]
    //     if (allowedRoutes.includes(router.route)) {
    //       if (router.route === '/') {
    //         return <Spinner />
    //       }
    
    //       return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    //     } else {
    //       return (
    //         <BlankLayout>
    //           <NotAuthorized />
    //         </BlankLayout>
    //       )
    //     }
    //   }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
