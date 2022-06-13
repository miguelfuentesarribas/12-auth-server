const { response } = require("express");
const  jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token')
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        })
    }

    try {
        const {uid, name} = jwt.verify (token, process.env.SECRET_JWT_SEED); 
        req.uid = uid;
        req.name = name;
       
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }

    // todo ok
    next();
}

module.exports = { validarJWT }