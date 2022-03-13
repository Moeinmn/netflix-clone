import jwt from "jsonwebtoken";


export function jwtDecode(token) {
    let decoded = jwt.verify(token, process.env.HASURA_SECRET_KEY);
    return decoded
}