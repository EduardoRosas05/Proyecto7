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
      const { concepto, monto } = req.body;
  
      // Crea un nuevo registro de gasto
      await db.Savings.create({ concepto, monto });
  
      // Calcula el balance actualizado sumando todos los montos de los gastos
      const balance = await db.Savings.sum('monto', { raw: true });
      
      // Actualiza el balance en todos los registros de la tabla
      await db.Savings.update({ balance }, { where: {}, raw: true });
  
      res.status(200).json({ message: 'Gasto registrado correctamente' });

    } catch (error) {
      console.error('Error al registrar el gasto: ', error);
      res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
}

const listSavings = async (req, res) => {
    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
    const category = await db.Savings.findAll({  
    });
        return res.json(category)

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

const updateSavings = async (req,res) => {
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
