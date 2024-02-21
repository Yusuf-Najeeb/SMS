import { useRouter } from "next/navigation"
import { useEffect } from "react"


const Home = () => {

  const router = useRouter()

  useEffect(()=>{

    router.push('/dashboard')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <>Home Page</>
}

export default Home
