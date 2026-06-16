import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (id)=>{
  let payload = {user_id:id}
  return jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {expiresIn:'2d'});
}