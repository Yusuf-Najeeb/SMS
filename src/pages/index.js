import { useRouter } from "next/navigation"


const Home = () => {

  const router = useRouter()

  useEffect(()=>{

    router.push('/dashboard')
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <>Home Page</>
}

export default Home
