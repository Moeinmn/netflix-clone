import { jwtDecode } from '../../lib/utils/jwt';
import { getLiked } from '../../lib/getHauraData';

import Card from './../../components/Card';
import Navbar from './../../components/Navbar';



export const getServerSideProps = async (context) => {
    if( !context?.req?.cookies?.token){return{redirect:{destination:"/login"}}}
    let jwtToken = context?.req?.cookies?.token;
    const decodedToken = jwtDecode(jwtToken);
    const userId = decodedToken.issuer;
    let likedMovies = await getLiked(userId, jwtToken);
    return {
        props:{
            likedMovies
        }
    }
}



export const userList = ({likedMovies}) => {
    return ( 
        <>
        <Navbar></Navbar>
        <section style={{display: 'flex' , flexWrap : "wrap",
        marginTop: '75px ',
        justifyContent: 'space-around',
        height: 'calc(100vh - 75px)',
        alignContent: 'baseline'
        }}>
            {
                likedMovies.map((movie , indx)=>{if(movie?.id?.videoId || movie?.id) return <Card size={"sm"} imgUrl={`https://i.ytimg.com/vi/${movie?.id?.videoId|| movie?.id}/maxresdefault.jpg`} videoId={ movie?.id?.videoId|| movie?.id } key={indx}/>})
            } 
        </section> 
        </>
    );
}

export default userList;