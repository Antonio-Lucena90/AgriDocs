import {compareString} from '../../utils/bcryptUtils.js';
import { generateToken } from '../../utils/tokenUtils.js';
import userDal from './user.dal.js';
import adminDal from '../admin/admin.dal.js';
import bcrypt from 'bcrypt';


class UserController {

  register = async (req, res) => {
    try {
      const { name, last_name, user_name, password, farm_name, invite_code } = req.body;

      const validCode = await adminDal.validateCode(invite_code)
      if (!validCode) {
        return res.status(400).json({ message: 'Código de invitación inválido o ya utilizado' })
      }

      let hashedPass = await bcrypt.hash(password, 10);
      let result = await userDal.register([name, last_name, user_name, hashedPass, farm_name]);
      const newUserId = result.insertId

      await adminDal.markCodeUsed(invite_code, newUserId)

      res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  login = async (req, res) => {
    const {user_name, password} = req.body;
    try {
      let result = await userDal.findUser(user_name);
       if (result.length === 0) {
        res.status(401).json({ message: 'Usuario no existe' });
      } else {
        let match = await compareString(password, result[0].password_hash);
        if (!match) {
          res.status(401).json({ message: 'Password incorrecta' });
        } else {
          const token = generateToken(result[0].user_id);
          res.status(200).json({ message: 'login ok', token });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  oneUser = async (req, res) => {
    const { user_id } = req;
    try {
      const result = await userDal.oneUser([user_id]);
      res.status(200).json({ message: 'ok', user: result[0] });
    } catch (error) {
      console.log('oneUser error:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new UserController();
