import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


import Banner from './../components/Banner';
import Navbar from './../components/Navbar';
import CardContainer from './../components/CardContainer';


import getMoviesList , {getMovieData, getPopularMovies} from '../lib/youtubeApi';
import { getWatched } from '../lib/getHauraData';

import { jwtDecode } from './../lib/utils/jwt';




export async function getServerSideProps(context){
  if( !context?.req?.cookies?.token){return{redirect:{destination:"/login"}}}
  let jwtToken = context?.req?.cookies?.token
  const decodedToken = jwtDecode(jwtToken);
  const userId = decodedToken.issuer;

  let bannerMovies = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ" , "CaimKeDcudo"];
  let randIndex = Math.floor(Math.random() * bannerMovies.length);
  let bannerMovieId = bannerMovies[randIndex];
  let bannerMovieData = await getMovieData(bannerMovieId);
  
  //get movie list for rendering in the page
  let watchedMovies = await getWatched(userId,jwtToken);
  let disneyMovies = await getMoviesList('disney trailer');
  let popularMovies = await getPopularMovies();
  let travelMovies = await getMoviesList('travel');
  let productivityMovies = await getMoviesList('productivity');
  return{
    props:{
      bannerMovieData,
      disneyMovies ,
      watchedMovies,
      popularMovies,
      travelMovies,
      productivityMovies
    }
  }
}

// ,
//       productivityMovies ,
//       travelMovies ,
//       popularMovies


export default function Home({bannerMovieData , disneyMovies , travelMovies , productivityMovies ,popularMovies , watchedMovies}) {
  

  return (
    <>
    <Navbar/>
    <Banner data = {bannerMovieData}/>

    <CardContainer title='Disney ' dataArray={disneyMovies} cardSize='lg'/>
    <CardContainer title='Watch Again ' dataArray={watchedMovies} cardSize='sm'/>
    <CardContainer title='Popular' dataArray={popularMovies} cardSize='sm'/>
    <CardContainer title='Travel' dataArray={travelMovies} cardSize='sm'/>
    <CardContainer title='Productivity' dataArray={productivityMovies} cardSize='md'/>

    </>
    )
}
