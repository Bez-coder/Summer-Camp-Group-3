// Auth middleware placeholder
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const Authentication=(req, res, next)=>{

    //1.get the token
        const jwtToken=req.header("token")
        if(!jwtToken){
            return res.status(403).json("Not Authorize")
        }

        
    try {
        
const payload=jwt.verify(jwtToken,process.env.JWT_SECRET);
req.user =payload.user

next()

    } catch (error) {
        console.error(error.message);
       return res.status(500).json('Not authorize')
    }
}
export default Authentication