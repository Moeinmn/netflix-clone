import {
    createMovie,
    getMovieByIdGql,
    updateMovie
} from '../../lib/db/hasuraGql';
import { jwtDecode } from './../../lib/utils/jwt';




export default async function getMovieById(req, res) {

    try {
        if(req.method !== "POST") return res.status(500).json({message:"req method should be POST "})
        const {
            movieId,
            favourited
        } = req.query;
        if(!req.cookies.token)return res.status(403).json({message: 'token is required'})
        //getting jwt from cookie
        const jwtToken = req.cookies.token;
        const decodedToken = jwtDecode(jwtToken);
        const userId = decodedToken.issuer;
    
        //first param = userId 2nd = movieId
        let movieData = await getMovieByIdGql(userId, movieId, jwtToken);
        // if movie was new create row in db
        if (movieData?.stats.length === 0) {
            let createdData = await createMovie(userId, movieId, jwtToken);
            return res.status(200).json({
                data: createdData
            })
        }
        //if movie wasnt new get the data 
        if (movieData?.stats.length > 0) {
            //update the row
            if (favourited) {
                let updatedData = await updateMovie(userId, movieId, jwtToken, favourited);
                return res.status(200).json({
                    data: updatedData
                })
            }else{
                //return movie data
                return res.status(200).json({
                    data: movieData?.stats[0]
                })
            }
        }
    
        res.status(200).json({
            test: 'done'
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
}