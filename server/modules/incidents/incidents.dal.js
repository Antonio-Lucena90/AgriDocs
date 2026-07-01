import excuteQuery from '../../config/db.js'

class IncidentsDal {

  createIncident = async (zone_id, values) => {
    try {
      const sql = `INSERT INTO irrigation_incidents (zone_id, date, type, description, zone_location, status)
                   VALUES (?, ?, ?, ?, ?, ?)`
      return await excuteQuery(sql, [zone_id, ...values])
    } catch (error) {
      throw error
    }
  }

  getIncidentsByFarm = async (farm_id) => {
    try {
      const sql = `SELECT i.incident_id, i.date, i.type, i.description, i.zone_location,
                          i.status, i.resolved_at, i.resolution_notes, i.created_at,
                          z.name AS zone_name, z.zone_id
                   FROM irrigation_incidents i
                   LEFT JOIN zones z ON i.zone_id = z.zone_id
                   WHERE z.farm_id = ? AND i.is_deleted = 0
                   ORDER BY i.date DESC`
      return await excuteQuery(sql, [farm_id])
    } catch (error) {
      throw error
    }
  }

  updateIncident = async (incident_id, fields) => {
    try {
      const { status, resolution_notes, resolved_at } = fields
      const sql = `UPDATE irrigation_incidents
                   SET status = ?, resolution_notes = ?, resolved_at = ?
                   WHERE incident_id = ?`
      return await excuteQuery(sql, [status, resolution_notes || null, resolved_at || null, incident_id])
    } catch (error) {
      throw error
    }
  }

}

export default new IncidentsDal()
