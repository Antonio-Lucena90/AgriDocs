import harvestDal from './harvest.dal.js';

class HarvestController {

  createHarvest = async (req, res) => {
    const { zone_id } = req.params
    const { date, fruit_type, variety, kg, notes } = req.body
    if (!date || !fruit_type || !kg) {
      return res.status(400).json({ message: 'Fecha, tipo de fruto y kg son obligatorios' })
    }
    try {
      await harvestDal.createHarvest(zone_id, { date, fruit_type, variety, kg, notes })
      res.status(201).json({ message: 'Cosecha registrada' })
    } catch (error) {
      console.log('createHarvest error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  getHarvestsByZone = async (req, res) => {
    const { zone_id } = req.params
    try {
      const result = await harvestDal.getHarvestsByZone(zone_id)
      res.status(200).json({ message: 'ok', harvests: result })
    } catch (error) {
      console.log('getHarvestsByZone error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  getHarvestsByFarm = async (req, res) => {
    const { farm_id } = req.params
    try {
      const result = await harvestDal.getHarvestsByFarm(farm_id)
      res.status(200).json({ message: 'ok', harvests: result })
    } catch (error) {
      console.log('getHarvestsByFarm error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  updateHarvest = async (req, res) => {
    const { harvest_id } = req.params
    const { price_per_kg, quality, notes } = req.body
    try {
      await harvestDal.updateHarvest(harvest_id, { price_per_kg, quality, notes })
      res.status(200).json({ message: 'Cosecha actualizada' })
    } catch (error) {
      console.log('updateHarvest error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

}

export default new HarvestController();
