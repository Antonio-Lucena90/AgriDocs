import fertilizedDal from './fertilized.dal.js';

class FertilizedController {

  createFertilization = async (req, res) => {
    const { farm_id } = req.params
    const { date, fertilizer_name, amount, unit, notes } = req.body
    try {
      const result = await fertilizedDal.createFertilization(farm_id, [
        date,
        fertilizer_name,
        amount,
        unit      || 'kg',
        notes     || null,
      ])
      res.status(200).json({ message: 'Abonado registrado', fertilization_id: result.insertId })
    } catch (error) {
      console.log('createFertilization error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  getFertilizationsByFarm = async (req, res) => {
    const { farm_id } = req.params
    try {
      const result = await fertilizedDal.getFertilizationsByFarm(farm_id)
      res.status(200).json({ message: 'ok', fertilizations: result })
    } catch (error) {
      console.log('getFertilizationsByFarm error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

}

export default new FertilizedController();
