import '../styles/globals.css'
import { magic } from '../lib/magic'
import {useState , useEffect} from 'react'
import {useRouter} from 'next/router'
import Loading from '../components/Loading'


function MyApp({ Component, pageProps }) {
  let [isLoading , setIsLoading] = useState(true);
  let router = useRouter();
  
  useEffect(()=>{

    ;(async()=>{
      try{
        //check user ip
        let asyncData = await fetch('https://api.db-ip.com/v2/free/self');
        let userLocData= await asyncData.json();
        if(userLocData.countryCode === "IR"){
          setIsLoading(false);
          router.push('/banned');
          router.events.on('routeChangeStart', ()=>{return})
          return
        }
        
        //getting user login data
        let userLog = await magic.user.isLoggedIn();
        if(!userLog){
        router.push('/login');
        
        const handleComplete = () => {
          setIsLoading(false);
        };
        router.events.on('routeChangeStart', handleComplete)
        return () => {
        router.events.off('routeChangeStart', handleComplete)
        }
        }else{setIsLoading(false)}
        
      }catch(error){
        alert(error?.message)
      }
    })();
    

},[router])
  
  
  
  
  return isLoading ? <Loading/> : <Component {...pageProps}/>
}

export default MyApp
