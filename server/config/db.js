import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true
})

const excuteQuery = async(sql, values=[])=>{
  let connection;
  try{
    /* abrir conexion con dbPool */
    connection = await dbPool.getConnection();
     /* ejecuto peticion */
   const [result] = await connection.query(sql, values); 
   return result; 
  }catch(error){
    console.log('Error en la consulta', error);
    throw error;
  }finally {
    /* Libera conexion */
    if(connection){
      connection.release();
    }
  }
}

export default excuteQuery;