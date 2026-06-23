import irrigationDal from "./irrigation.dal.js";

class IrrigationController {

  getIrrigationsByFarm = async (req, res) => {
    const { farm_id } = req.params
    try {
      const result = await irrigationDal.getIrrigationsByFarm(farm_id)
      res.status(200).json({ message: 'ok', irrigations: result })
    } catch (error) {
      console.log('getIrrigationsByFarm error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  irrigationRecord = async (req, res) => {
    const { farm_id } = req.params
    const { date, start_time, duration_minutes, total_liters, pressure_bar, notes } = req.body
    try {
      const result = await irrigationDal.irrigationRecord(farm_id, [
        date,
        start_time       || null,
        duration_minutes || null,
        total_liters     || null,
        pressure_bar     || null,
        notes            || null,
      ])
      res.status(200).json({ message: 'Riego registrado', irrigation_id: result.insertId })
    } catch (error) {
      console.log('irrigationRecord error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

}

export default new IrrigationController();