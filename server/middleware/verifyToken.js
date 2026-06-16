import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req,res,next)=>{
  const tokenBeared = req.headers.authorization;
  if(!tokenBeared){
    res.status(401).json({message:'No autorizado'})
  }else{
    const token = tokenBeared.split(' ')[1]
    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, result)=>{
      if(error){
        res.status(401).json({message:'No autorizado'})
      }else{
        req.user_id = result.user_id
        next()
      }
    })
  }
}