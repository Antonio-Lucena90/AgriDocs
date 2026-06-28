import excuteQuery from "../../config/db.js";

class FarmDal {

  createFarm = async (values) => {
    try {
      const sql = `INSERT INTO farms (user_id, name, location, country_code, hectares, description)
                   VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await excuteQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getFarmsByUser = async (user_id) => {
    try {
      const sql = `SELECT farm_id, name, location, country_code, hectares, description, created_at
                   FROM farms
                   WHERE user_id = ? AND is_deleted = 0
                   ORDER BY created_at DESC`;
      const result = await excuteQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

export default new FarmDal();