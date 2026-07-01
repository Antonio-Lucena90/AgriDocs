import excuteQuery from '../../config/db.js'
import crypto from 'crypto'

class AdminDal {

  getAllUsers = async () => {
    try {
      const sql = `SELECT user_id, name, last_name, user_name, farm_name, role, created_at
                   FROM users
                   WHERE is_deleted = 0
                   ORDER BY created_at DESC`
      return await excuteQuery(sql, [])
    } catch (error) {
      throw error
    }
  }

  generateCode = async () => {
    try {
      const code = crypto.randomBytes(5).toString('hex').toUpperCase()
      const sql = `INSERT INTO invite_codes (code) VALUES (?)`
      await excuteQuery(sql, [code])
      return code
    } catch (error) {
      throw error
    }
  }

  getAllCodes = async () => {
    try {
      const sql = `SELECT ic.code_id, ic.code, ic.is_used, ic.created_at,
                          u.name AS used_by_name, u.last_name AS used_by_last_name
                   FROM invite_codes ic
                   LEFT JOIN users u ON ic.used_by = u.user_id
                   ORDER BY ic.created_at DESC`
      return await excuteQuery(sql, [])
    } catch (error) {
      throw error
    }
  }

  validateCode = async (code) => {
    try {
      const sql = `SELECT code_id FROM invite_codes WHERE code = ? AND is_used = 0`
      const result = await excuteQuery(sql, [code])
      return result[0] || null
    } catch (error) {
      throw error
    }
  }

  markCodeUsed = async (code, user_id) => {
    try {
      const sql = `UPDATE invite_codes SET is_used = 1, used_by = ? WHERE code = ?`
      return await excuteQuery(sql, [user_id, code])
    } catch (error) {
      throw error
    }
  }

}

export default new AdminDal()
