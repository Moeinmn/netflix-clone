

export default async function getMoviesList(query , limit = 10){
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=${limit}&key=${process.env.YOUTUBE_API_KEY}` 
    let data = await fetch(url);
    let moviesList = await data.json();
    return moviesList.items
}

export const getPopularMovies = async ()=>{
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`
    let data = await fetch(url);
    let moviesList = await data.json();
    return moviesList.items
}
export const getMovieData = async (movieId)=>{
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${movieId}&key=${process.env.YOUTUBE_API_KEY}`
    let data = await fetch(url);
    let moviesList = await data.json();
    return moviesList.items[0]
}