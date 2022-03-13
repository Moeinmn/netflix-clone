const cookie = require('cookie');

const MAX_AGE = 7*24*60*60;

export const setCookie = (token, res)=>{
    const cookieData = cookie.serialize('token', token,{        
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    res.setHeader("Set-Cookie", cookieData);
    return cookieData
}