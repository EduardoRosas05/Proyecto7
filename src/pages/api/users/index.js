import bcrypt from 'bcrypt';
import db from 'database/models';

export default function handler(req, res) {
  switch(req.method){
      case 'POST':
          return addClient(req, res);
      case 'GET':
          return listClient(req, res);
      case 'PUT':
          return updateClient(req,res);
      case 'DELETE':
          return deleteClient(req, res);
      default:
          res.status(400).json({error: true, message:'Petición errónea'});
  }
}

const addClient = async (req, res) =>  {
  try {
    // validar que venga la contraseña
    if (!req.body.password) {
      return res.status(400).json({ message: 'La contraseña es obligatoria.'});
    }

    const datosUsuario = {...req.body};

    const salt = await bcrypt.genSalt(10);

    datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

    const user = await db.User.create(datosUsuario);

    user.password = null; 

    res.json({ message: 'El usuario ha sido registrado.', user});
  } catch (error) {
    console.log(error);
  
    let errors = [];
    if (error.errors) {
      errors = error.errors.map( errorItem => ({ 
        campo: errorItem.path,
        error: errorItem.message,
      }));
    }

    res.json({ error: true, message: 'Error al registrar el usuario', errors });
  }
};

const listClient = async (req, res) => {
  try{
      //los datos vienen del req.body
      console.log(req.body);
      //guardar cliente
  const Clientss1 = await db.User.findAll({
      include:['savinegs'],
  });
      
      return res.json(Clientss1)
  
  }catch(error){
      console.log(error);
      let errors = []

      if(error.errors){
          //extrae la info
          errors = error.errors.map((item) => ({
              error: item.message, 
              field: item.path,
          }));
      }

      return res.status(400).json({
          message: `Ocurrió un error al procesar la petición: ${error.message}`,
          errors,
      })
  }
}

const deleteClient = async (req,res) => {

  try{
    const {id} = req.query;
    
      const deletedRows = await db.User.destroy({
          where: {
              id: id
          }
      })

      if (deletedRows === 0) {
          // Si no se eliminó ningún registro, significa que el ID no existe
          return res.status(404).json({ error: "No se encontró el ahorro" });
        }

      res.json({
          message: 'El usuario fue eliminada'
      })

    }
       catch (error){
          res.status(400).json({ error: "error al momento de borrar la categoria"})
  }
}

const updateClient = async (req,res) => {

  try{

      let {id} = req.query;
      await db.User.update({...req.body},
          {
          where :{
              id : id
          },

      })


      res.json({
          message: 'El usuario fue actualizada con exito'
      })

    }
       catch (error){
          res.status(400).json({ error: "error al momento de actualizar el usuario"})
  }
}
