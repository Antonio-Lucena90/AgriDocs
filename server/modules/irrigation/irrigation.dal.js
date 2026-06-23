import executeQuery from '../../config/db.js';

class IrrigationDal {

  getIrrigationsByFarm = async (farm_id) => {
    try {
      const sql = `SELECT irrigation_id, date, start_time, duration_minutes, total_liters, pressure_bar, notes, created_at
                   FROM irrigation_records
                   WHERE farm_id = ? AND is_deleted = 0
                   ORDER BY date DESC`
      const result = await executeQuery(sql, [farm_id])
      return result
    } catch (error) {
      throw error
    }
  }

  irrigationRecord = async (farm_id, values) => {
    try {
      const sql = `INSERT INTO irrigation_records
                   (farm_id, date, start_time, duration_minutes, total_liters, pressure_bar, notes)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`
      const result = await executeQuery(sql, [farm_id, ...values])
      return result
    } catch (error) {
      throw error
    }
  }

}

export default new IrrigationDal(); 