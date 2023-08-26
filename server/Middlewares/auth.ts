

import jwt from 'jsonwebtoken'
export const auth = async (req:any,res:any,next:any)=>{
    try{
        const token = req.headers["authtoken"]
        console.log(token);
        if(!token){
            return res.status(401).send("No token")
        }
        const decoded= jwt.verify(token,"jwtsecret");
        req.body=decoded
        next();
    }catch(err){
        console.log(err);
        res.send('Token Invalid!!!').status(500)
    }
}