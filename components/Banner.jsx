import styles from './Banner.module.css'
import  Link  from 'next/link';

const Banner = ({data}) => {
    return ( 
        
        <div className={styles.banner} style={{backgroundImage: `url(https://i.ytimg.com/vi/${data?.id?.videoId|| data?.id}/maxresdefault.jpg)`}}>
            <div className={styles.textContent}>
                <span className={styles.bigN}>N</span>
                <span className={styles.series}>s e r i e s</span>
            
            <h3>{data?.snippet?.title}</h3>
            <p>{data?.channelTitle}</p>
            <Link href={`/videos/${data?.id}`} passHref>
            <a>
                <span className="material-icons">play_arrow</span>Play
            </a>
            </Link>
            </div>
        </div>
     );
}
 
export default Banner;