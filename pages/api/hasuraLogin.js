const {
  Magic
} = require('@magic-sdk/admin');
const magicAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
import {
  newUser,
  createUser
} from '../../lib/db/hasuraGql';
import {
  setCookie
} from './../../lib/cookie';


var jwt = require('jsonwebtoken');

const hausraLogin = async (req, res) => {
  try {
    //Get magic metadata by token 
    let didToken = req.query.didToken;
    const metadata = await magicAdmin.users.getMetadataByToken(didToken);
    //Creating jwt by magic metadata
    let jwtToken = jwt.sign({
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["editor", "user", "mod"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`
        }
      },
      process.env.HASURA_SECRET_KEY, {
        algorithm: 'HS256'
      })
    //Checking if the user is new or not
    let hasuraUserData = await newUser(metadata, jwtToken);
    //if new user go and create user in db
    hasuraUserData?.users.length === 0 && (await createUser(metadata, jwtToken));
    //setting cookie 
    setCookie(jwtToken, res);
    
    res.status(200).json({
      message: 'welldone!'
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }











}
export default hausraLogin;