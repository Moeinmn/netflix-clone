import styles from './Card.module.css'
import  Image  from 'next/image';
import Link from 'next/link'



const Card = ({size , imgUrl , videoId}) => {
    let classString = `${size}Card`;
    let alterUrl = '/alterImg.jpg'
    return ( 
        <>
         <Link href={`/videos/${videoId}`} passHref>
          <a>
          <div className={`${styles.imgContainer} ${styles[classString]}`}>
              <Image src={imgUrl || alterUrl}  layout='fill' alt='image' quality={100}/>
          </div>
          </a>
        </Link>
        </>
     );
}
 
export default Card;

