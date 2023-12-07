import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import db from 'database/models';

export default function handler(req, res){
    switch(req.method) {
        case 'POST':
            return loginUser(req, res);
    default:
        res.status(400).json({ error: true, message: 'peticion erronea'});
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        //
        if (!email && !password) {
            return res.status(400).json({
                error: true,
                message: 'Ingresa ambos campos',
                errors: [
                    {
                        error: "El email es obligatorio",
                        field: "email"
                    },
                    {
                        error: "La contraseña es obligatoria",
                        field: "password"
                    }
                ]
            });
        } else if (!email){
            return res.status(400).json({
                error: true,
                message: "email es obligatorio",
                errors: [
                    {
                        error: "el email es obligatorio",
                        field: "email"
                    }
                ]
            });
        }
        
        const user = await db.User.findOne({ where: {email}});
        if(!user){
            return res.status(400).json({ error: true, message: "este correo no ha sido registrado"})
        }
        //  verficar password
        if(user && bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({ userId: user.id, email: user.email}, process.env.NEXTAUTH_SECRET, {expiresIn: '6h'});
            return res.setHeader('authorization', token).json({
                message: "Acceso Autorizado",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    roleId: user.role
                }
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Contraseña es incorrecta",
                errors: [
                    {
                        error: "La contraseña es incorrecta",
                        field: 'password'
                    }
                ]
            });
        
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(
            {
                error: true,
                message:`Ocurrio un error al procesar la peticion: ${error.message}`,
                errors,
            }
        )
    }
    
}