import incidentsDal from './incidents.dal.js'

class IncidentsController {

  createIncident = async (req, res) => {
    const { zone_id } = req.params
    const { date, type, description, zone_location, status } = req.body
    if (!date || !type || !description) {
      return res.status(400).json({ message: 'Fecha, tipo y descripción son obligatorios' })
    }
    try {
      await incidentsDal.createIncident(zone_id, [
        date,
        type,
        description,
        zone_location || null,
        status || 'pending',
      ])
      res.status(201).json({ message: 'Incidencia registrada' })
    } catch (error) {
      console.log('createIncident error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  getIncidentsByFarm = async (req, res) => {
    const { farm_id } = req.params
    try {
      const result = await incidentsDal.getIncidentsByFarm(farm_id)
      res.status(200).json({ message: 'ok', incidents: result })
    } catch (error) {
      console.log('getIncidentsByFarm error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  updateIncident = async (req, res) => {
    const { incident_id } = req.params
    const { status, resolution_notes, resolved_at } = req.body
    if (!status) {
      return res.status(400).json({ message: 'El estado es obligatorio' })
    }
    try {
      await incidentsDal.updateIncident(incident_id, { status, resolution_notes, resolved_at })
      res.status(200).json({ message: 'Incidencia actualizada' })
    } catch (error) {
      console.log('updateIncident error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }



}

export default new IncidentsController()
