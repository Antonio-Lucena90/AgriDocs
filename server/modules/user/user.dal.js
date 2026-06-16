import excuteQuery from '../../config/db.js'; 

class UserDal {
    register = async (values)=>{
    try{
      let sql = 'INSERT INTO users (name, last_name, user_name, password_hash, farm_name) VALUES (?,?,?,?,?)'
      let result = await excuteQuery(sql, values)
      return result
    }catch(error){
      throw error
    }
  }

  findUser = async (user_name) => {
    try {
      let sql = 'SELECT id, password_hash FROM users WHERE user_name = ? AND is_deleted = 0'; 
      let result = await excuteQuery(sql, [user_name]);
      return result; 
    } catch (error) {
      throw error; 
    }
  }

  oneUser = async (values) =>{
    try{
      let sql = 'SELECT id, name, last_name, user_name, farm_name, role FROM users WHERE id = ? AND is_deleted = 0'
      let result = await excuteQuery(sql, values);
      return result;
    }catch(error){
      throw error;
    }
  }
}

export default new UserDal(); 