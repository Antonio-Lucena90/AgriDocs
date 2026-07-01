import adminDal from './admin.dal.js'

class AdminController {

  getAllUsers = async (req, res) => {
    try {
      const result = await adminDal.getAllUsers()
      res.status(200).json({ message: 'ok', users: result })
    } catch (error) {
      console.log('getAllUsers error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  generateCode = async (req, res) => {
    try {
      const code = await adminDal.generateCode()
      res.status(201).json({ message: 'Código generado', code })
    } catch (error) {
      console.log('generateCode error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  getAllCodes = async (req, res) => {
    try {
      const result = await adminDal.getAllCodes()
      res.status(200).json({ message: 'ok', codes: result })
    } catch (error) {
      console.log('getAllCodes error:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

}

export default new AdminController()
