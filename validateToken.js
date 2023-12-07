import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
    const accessToken = req.headers['authotization'] || req.query.accessToken;
    if(!accessToken) return next();
    jwt.verify(accessToken, process.env.NEXTAUTH_SECRET, (err, user) => {
        if(err){
            return res.status(401).json({error: 'acceso denegado, Token incorrecto o expirado'})
        } else {
            req.user = user;
            next()
        }
    })
}