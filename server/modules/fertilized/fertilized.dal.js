import excuteQuery from '../../config/db.js';

class FertilizedDal {

  createFertilization = async (farm_id, values) => {
    try {
      const sql = `INSERT INTO fertilization_records
                   (farm_id, date, fertilizer_name, amount, unit, notes)
                   VALUES (?, ?, ?, ?, ?, ?)`
      const result = await excuteQuery(sql, [farm_id, ...values])
      return result
    } catch (error) {
      throw error
    }
  }

  getFertilizationsByFarm = async (farm_id) => {
    try {
      const sql = `SELECT fertilization_id, date, fertilizer_name, amount, unit, notes, created_at
                   FROM fertilization_records
                   WHERE farm_id = ? AND is_deleted = 0
                   ORDER BY date DESC`
      const result = await excuteQuery(sql, [farm_id])
      return result
    } catch (error) {
      throw error
    }
  }

}

export default new FertilizedDal();
