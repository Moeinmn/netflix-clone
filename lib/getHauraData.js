import { getUserWatchedMovies , getUserLikedMovies} from "./db/hasuraGql";

export async function getWatched (userId ,token) {
    let data = await getUserWatchedMovies(userId , token); 
    let returnedData = data.stats.map(movie =>({
        id: movie.videoId,
        imgUrl :`https://i.ytimg.com/vi/${movie.videoId}/maxresdefault.jpg`
    }))
    return returnedData;
}
export async function getLiked (userId ,token) {
    let data = await getUserLikedMovies(userId , token); 
    let returnedData = data.stats.map(movie =>({
        id: movie.videoId,
        imgUrl :`https://i.ytimg.com/vi/${movie.videoId}/maxresdefault.jpg`
    }))
    return returnedData;
}