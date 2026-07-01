import excuteQuery from "../../config/db.js";

class HarvestDal {

  createHarvest = async (zone_id, values) => {
    try {
      const { date, fruit_type, variety, kg, notes } = values
      const sql = `INSERT INTO harvests (zone_id, date, fruit_type, variety, kg, notes)
                   VALUES (?, ?, ?, ?, ?, ?)`
      return await excuteQuery(sql, [zone_id, date, fruit_type, variety || null, kg, notes || null])
    } catch (error) {
      throw error
    }
  }

  getHarvestsByZone = async (zone_id) => {
    try {
      const sql = `SELECT harvest_id, date, fruit_type, variety, kg, quality, price_per_kg, notes, created_at
                   FROM harvests
                   WHERE zone_id = ? AND is_deleted = 0
                   ORDER BY date DESC`
      return await excuteQuery(sql, [zone_id])
    } catch (error) {
      throw error
    }
  }

  getHarvestsByFarm = async (farm_id) => {
    try {
      const sql = `SELECT h.harvest_id, h.date, h.fruit_type, h.variety, h.kg,
                          h.quality, h.price_per_kg, h.notes, h.created_at,
                          z.name AS zone_name, z.zone_id
                   FROM harvests h
                   LEFT JOIN zones z ON h.zone_id = z.zone_id
                   WHERE z.farm_id = ? AND h.is_deleted = 0
                   ORDER BY h.date DESC`
      return await excuteQuery(sql, [farm_id])
    } catch (error) {
      throw error
    }
  }

  updateHarvest = async (harvest_id, values) => {
    try {
      const { price_per_kg, quality, notes } = values
      const sql = `UPDATE harvests
                   SET price_per_kg = ?, quality = ?, notes = ?
                   WHERE harvest_id = ?`
      return await excuteQuery(sql, [price_per_kg || null, quality || null, notes || null, harvest_id])
    } catch (error) {
      throw error
    }
  }

}

export default new HarvestDal();
