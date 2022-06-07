const validateToken = async(req, res, next) => {
    
    const jwt = require('jsonwebtoken');

    try{
        
        const token = req.header('auth-token');
        if(!token) return res.json({err: true, message: 'no existe token'});

        const validateToken = jwt.verify(token, process.env.token_secret);

        req.user = validateToken;

        next();
        
    }catch(err){return res.json({err: true, message: 'algo salió mal token'})}
}

module.exports = validateToken;