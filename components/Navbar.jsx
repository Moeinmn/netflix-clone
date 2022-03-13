import styles from './Navbar.module.css'
import  Image  from 'next/image';
import { useState, useEffect } from 'react';
import { magic } from '../lib/magic';
import { useRouter } from 'next/router';
import Link from 'next/link';

const  Navbar= () => {
  let [dropDown , setDropDown] = useState(false)
  let [username , setUsername] = useState('')
  let [didToken , setDidToken] = useState('')
  let router = useRouter();

let handleDropDown =()=>{
    setDropDown(!dropDown)
  }  
let signOutFunc = async (event)=>{
  event.preventDefault;
  try {
    await magic.user.logout();
    router.push('/login');
    document.cookie = `token=; Max-Age=-99999999;`
    console.log(document.cookie);
  } catch (error) {
      alert(error?.message)
      router.push('/login')
  }

}

useEffect(()=>{
  async function handleMagic() {
    try {
      const { email, issuer } = await magic.user.getMetadata();
      const didToken = await magic.user.getIdToken();
      if (email) {
        setUsername(email);
        setDidToken(didToken);
      }
    } catch (error) {
      alert(`${error.message}`)
    }
  }
  handleMagic();
},[])
  return ( 
        <>
        <nav className={styles.navContainer}>
        <div style={{display: 'flex'}}>
        <a className={styles.logoLink} href="//">
          <div className={styles.logoWrapper}>
            <Image
              src="/netflix.svg"
              alt="Netflix logo"
              width="110px"
              height="34px"
            />
          </div>
        </a>
        <Link href='./' passHref>
        <a className={styles.menuBtn}>Home</a>
        </Link>
        <Link href='/browse/userList' passHref>
        <a className={styles.menuBtn}>My List</a>
        </Link>
        </div>
            
            <div className={styles.userInfo}>
            <p onClick={handleDropDown}>{username}
            <span className="material-icons">
            expand_more
            </span>
            </p>
            
            {
              dropDown && (
                <div className={styles.dropDown}>
                <a onClick={(e)=>{signOutFunc(e)}}>Sign Out</a>
                </div>
              )
            }
            </div>
        </nav>
        </>
     );
}
 
export default Navbar;