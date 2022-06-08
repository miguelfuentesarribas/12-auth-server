const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {

    const errors = validationResult( req ); 
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    const {email, name, password} = req.body
    console.log( email, name, password );

    return res.json({
        ok: true,
        msg: 'Crear usuario nuevo /new'
    });

};

const loguearUsuario = (req, res = response) => {

    

    const errors = validationResult( req ); 
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    const {email, password} = req.body
    console.log( email, password );


    return res.json({
        ok: true,
        msg: 'Loguin de usuario / '
    });

};

const revalidarToken = (req, res) => {

    return res.json({
        ok: true,
        msg: 'Revalidar token'
    });

};

module.exports = {
    crearUsuario,
    loguearUsuario,
    revalidarToken
};