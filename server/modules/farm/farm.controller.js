import farmDal from './farm.dal.js';

class FarmController {

  getFarmsByUser = async (req, res) => {
    const { user_id } = req;
    try {
      const result = await farmDal.getFarmsByUser(user_id);
      res.status(200).json({ message: 'ok', farms: result });
    } catch (error) {
      console.log('getFarmsByUser error:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  createFarm = async (req, res) => {
    const { user_id } = req;
    const { name, location, country_code, hectares, description } = req.body;
    try {
      const result = await farmDal.createFarm([user_id, name, location || null, country_code || 'ES', hectares || null, description || null]);
      res.status(201).json({ message: 'Finca creada', farm_id: result.insertId });
    } catch (error) {
      console.log('createFarm error:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

}

export default new FarmController();