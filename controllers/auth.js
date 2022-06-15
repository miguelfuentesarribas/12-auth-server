const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {

    const {email, name, password} = req.body
    console.log( email, name, password );

    try {
     
        //verificar si no existe un correo igual
        const usuario = await Usuario.findOne({email})

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        };
        
        //montar usuario segun modelo
        const dbUser = new Usuario( req.body );

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        //generar JWT
        const token = await generarJWT( dbUser.id, name);


        // crear usuario de la base de datos
        await dbUser.save()

        //generar respuesta existosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
};

const loguearUsuario = async(req, res = response) => {

    const {email, password} = req.body
    console.log( email, password );

    try {
        
        //confirmar que el correo se encuentra en la base de datos
        const dbUser = await Usuario.findOne({email});
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        };

        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password )
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            });
        }
    
        //generar JWT
        const token = await generarJWT( dbUser.id, dbUser.name);

        //respuesta del servicio
        // por defecto status 200 ( exitoso )
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
};

const revalidarToken = async(req, res= response) => {

    const {uid} = req;

    // leer base de datos
    const dbUser =  await Usuario.findById(uid);
    
    //generar JWT
    const token = await generarJWT( uid, dbUser.name);

    return res.json({
        ok: true,
        msg: 'Revalidar token',
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });

};

module.exports = {
    crearUsuario,
    loguearUsuario,
    revalidarToken
};