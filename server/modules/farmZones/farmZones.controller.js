import farmZonesDal from './farmZones.dal.js';

class farmZonesController {

  
  createZones = async (req, res) => {
    const { farm_id } = req.params
    const { zones } = req.body
    try {
      const results = await farmZonesDal.createZones(farm_id, zones)
      res.status(200).json({ message: 'Zonas creadas', total: results.length })
    } catch (error) {
      console.log('createZones error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
  
  getZonesByFarm = async (req, res) => {
    const { farm_id } = req.params
    try {
      const result = await farmZonesDal.getZonesByFarm(farm_id)
      res.status(200).json({ message: 'ok', zones: result })
    } catch (error) {
      console.log('getZonesByFarm error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  updateZone = async (req, res) => {
    const { zone_id } = req.params
    const { name } = req.body
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'El nombre es obligatorio' })
    }
    try {
      await farmZonesDal.updateZone(zone_id, name.trim())
      res.status(200).json({ message: 'Zona actualizada' })
    } catch (error) {
      console.log('updateZone error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  deleteZone = async (req, res) => {
    const { zone_id } = req.params
    try {
      await farmZonesDal.deleteZone(zone_id)
      res.status(200).json({ message: 'Zona eliminada' })
    } catch (error) {
      console.log('deleteZone error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

}

export default new farmZonesController(); 