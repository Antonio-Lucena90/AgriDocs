import excuteQuery from "../../config/db.js";

class farmZonesDal {


  createZones = async (farm_id, zones) => {
    try {
      const sql = 'INSERT INTO zones (farm_id, name) VALUES (?, ?)'
      const results = await Promise.all(
        zones.map(zone => excuteQuery(sql, [farm_id, zone]))
      )
      return results
    } catch (error) {
      throw error
    }
  }

    getZonesByFarm = async (farm_id) => {
    try {
      const sql = 'SELECT zone_id, name FROM zones WHERE farm_id = ? AND is_deleted = 0 ORDER BY created_at ASC'
      const result = await excuteQuery(sql, [farm_id])
      return result
    } catch (error) {
      throw error
    }
  }

  updateZone = async (zone_id, name) => {
    try {
      const sql = 'UPDATE zones SET name = ? WHERE zone_id = ? AND is_deleted = 0'
      const result = await excuteQuery(sql, [name, zone_id])
      return result
    } catch (error) {
      throw error
    }
  }

  deleteZone = async (zone_id) => {
    try {
      const sql = 'UPDATE zones SET is_deleted = 1 WHERE zone_id = ?'
      const result = await excuteQuery(sql, [zone_id])
      return result
    } catch (error) {
      throw error
    }
  }

}

export default new farmZonesDal(); 