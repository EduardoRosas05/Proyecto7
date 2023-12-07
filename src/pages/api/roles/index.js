import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getRole (req, res);

        case 'POST':
            return addRole (req, res);

        case 'PUT':
            return updateRole (req, res);

        case 'DELETE':
            return deleteRole (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getRole = async (req, res) => {
    try {
        const { id } = req.query;

      if (id) {
          const role = await db.Role.findByPk(id);
          if (!role) {
              return res.status(404).json({ error: true, message: 'No se encontró el rol' });
          }
          return res.json(role);
      } else {
          const role = await db.Role.findAll();
          return res.json(role);
      }
    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

const addRole = async (req, res) => {
    try {
        console.log(req.body);
        
        const role = await db.Role.create({...req.body});
        res.json({
            role,
            message: 'Se registro el Rol correctamente'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}

const updateRole = async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        if (!id || Object.keys(updates).length === 0) {
        res.status(400).json({
            error: 'Faltan datos para actualizar o el ID es incorrecto'
        });
        } else {
        const role = await db.Role.findOne({ where: { id } });

        if (!role) {
            res.status(400).json({
            error: true,
            message: 'ID de rol incorrecto'
            });
        } else {
            await db.Role.update({...updates}, {
            where: {
                id: id
            }
            });
            res.json({
            message: 'El Rol fue actualizado'
            });
        }
        }

    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

  const deleteRole = async (req, res) => {
    console.log('Delete ligue method called');
    try {
        const { id } = req.query;

      const role = await db.Role.findOne({ where: { id: id } });

      if (!role) {
        return res.status(404).json({
          error: true,
          message: 'El Rol no existe',
        });
      }

        await role.destroy();

        res.json({
            message: 'El Rol fue eliminado'
        })

    } catch(error){
        console.log('Error in delete role', error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message, 
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }