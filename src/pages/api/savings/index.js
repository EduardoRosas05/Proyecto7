import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addSavings(req, res);
            
        case 'GET':
            return listSavings(req, res);

        case 'PUT':
            return updateSavings(req,res);

        case 'DELETE':
            return deleteSavings(req, res);

        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
} 
  
  
const addSavings = async (req, res) =>  {
    try {
      const { concepto, monto, clientId } = req.body;
  
      // Crea un nuevo registro de gasto
      await db.Savings.create({ concepto, monto, clientId });
  
      // Calcula el balance actualizado sumando todos los montos de los gastos
      const balance = await db.Savings.sum('monto', { raw: true });
      
      // Actualiza el balance en todos los registros de la tabla
      await db.Savings.update({ balance }, { where: {}, raw: true });
  
      res.status(200).json({ message: 'Gasto registrado correctamente' });

    } catch (error) {

        console.log(error);

        let errors = [];
        if (error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
                }));
        }
      return res.status(400).json( {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors,
        } 
      )
    }
}

const listSavings = async (req, res) => {
    try{

      const {id} = req.query;

      if(id){
        const savings = await db.Savings.findByPk(id);
        if(!savings){
          return res.status(404).json({error: true, message: 'No se encontro el id'});
        }
        return res.json(savings);
      } else {
        const savings = await db.Savings.findAll();
        return res.json(savings);
      }

 /*      console.log("Listar");
        //los datos vienen del req.body
        /* console.log(req.body); 
        //guardar cliente
    const category = await db.Savings.findAll({  
       include:['client'], 

    });
        return res.json(category)
 */
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

const deleteSavings = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedRows = await db.Savings.destroy({
      where: { id: id }
    });

    if (deletedRows === 0) {
      // Si no se eliminó ningún registro, significa que el ID no existe
      return res.status(404).json({ error: "No se encontró el ahorro" });
    }

    // Calcula el balance actualizado sumando todos los montos de los gastos
    const balance = await db.Savings.sum('monto');

    // Actualiza el balance en todos los registros de la tabla
    await db.Savings.update({ balance }, { where: {}, raw: true });

    res.json({
      message: 'El ahorro fue eliminado'
    });
  } catch (error) {
    res.status(400).json({ error: "Error al momento de borrar el ahorro" });
  }
};
/*
const deleteSavings = async (req,res) => {
    try{
      const {id} = req.query;
      
        await db.Savings.destroy({
            where: { id: id }
        })
        // Calcula el balance actualizado sumando todos los montos de los gastos
        const balance = await db.Savings.sum('monto');
        // Actualiza el balance en todos los registros de la tabla
        await db.Savings.update({ balance }, { where: {}, raw: true });

        res.json({
            message: 'El ahorro fue eliminada'
        })
      }
         catch (error){
            res.status(400).json({ error: "error al momento de borrar el ahorro"})
    }
}
*/
const updateSavings = async (req, res) => {
    try {
      const { id } = req.query;
      const { concepto, monto } = req.body;
  
      // Verifica si falta algún campo obligatorio en el cuerpo de la petición
      if (!concepto || !monto) {
        return res.status(400).json({ error: "Faltan campos obligatorios en la petición" });
      }
  
      await db.Savings.update({ ...req.body }, { where: { id: id } });
  
      // Calcula el balance actualizado sumando todos los conceptos de los gastos
      const balance = await db.Savings.sum('concepto');
  
      // Actualiza el balance en todos los registros de la tabla
      await db.Savings.update({ balance }, { where: {}, raw: true });
  
      res.json({
        message: 'El ahorro fue actualizado con éxito'
      });
    } catch (error) {
      res.status(400).json({ error: "Error al momento de actualizar el ahorro" });
    }
  };

/*const updateSavings = async (req,res) => {
    try{
        let {id} = req.query;
        await db.Savings.update({...req.body},

            {where :{id : id} })

        // Calcula el balance actualizado sumando todos los montos de los gastos
        const balance = await db.Savings.sum('monto');

        // Actualiza el balance en todos los registros de la tabla
        await db.Savings.update({ balance }, { where: {}, raw: true });

        res.json({
            message: 'El ahorro fue actualizada con exito'
        })
      }
         catch (error){
            res.status(400).json({ error: "error al momento de actualizar el ahorro"})
    }
}
*/