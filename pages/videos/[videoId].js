import { getMovieData } from "../../lib/youtubeApi";
import { useEffect , useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../../styles/VideoId.module.css"
import VideoLike from "../../components/VideoLike";
import VideoDislike from "../../components/VideoDislike";
import Navbar from './../../components/Navbar';



export async function getStaticProps(context) {
    let videoId = context.params.videoId
    let movieData = await getMovieData(videoId);

    return{
        props:{
            movieData
        },
        revalidate : 20 // seconds
    } 

    
}
export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ","CaimKeDcudo"];
    const paths = listOfVideos.map((videoId) => ({
      params: { videoId },
    }));
    return { paths, fallback: "blocking" };
}

const VideoPage = ({movieData}) => {
    const{publishedAt , title , description , channelTitle} = movieData.snippet ;
    const {viewCount} = movieData.statistics ;
    const [liked , setLiked] = useState();
    let router = useRouter();
    let movieId = router.query.videoId;
    
    
    useEffect(()=>{
        ;(async function doAsync() {
                let movieData = await fetch(`/api/getMovieById/?movieId=${movieId}`,{method:"POST"});
                let movieJson = await movieData.json();
                if(movieJson?.data?.watched){
                    setLiked(movieJson.data.favourited)
                }
            }
        )();
    })
    let handleLike = async()=>{
        await fetch(`/api/getMovieById/?movieId=${movieId}&favourited=${1}`,{method:"POST"});
        setLiked(1);
    }
    let handleDislike = async()=>{
        await fetch(`/api/getMovieById/?movieId=${movieId}&favourited=${0}`,{method:"POST"});
        setLiked(0);
    }
    return ( 
    <>
    <Navbar/>
    <div className={styles.container}>
    <div style={{position: 'relative'}}>
    <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${movieData.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
    ></iframe>
    <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleLike}>
              <div className={styles.btnWrapper}>
                <VideoLike liked={liked}/>
              </div>
            </button>
          </div>
          <button onClick={handleDislike} >
            <div className={styles.btnWrapper}>
              <VideoDislike liked={liked} />
            </div>
          </button>
    </div>
    </div>
    
    <div className={styles.textContainer}>
    <p>{publishedAt}</p>
    <p>{title}</p>
    <span>cast:</span><p>{channelTitle}</p>
    <span>view count:</span><p>{viewCount}</p>
    <p>{description}</p>
    </div>
    </div>
    </>
     );
}
 
export default VideoPage;