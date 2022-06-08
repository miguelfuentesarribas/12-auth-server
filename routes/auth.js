const { Router } = require('express');
const { check } = require('express-validator');
 
const { crearUsuario, loguearUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

//crear un nuevo usuario
router.post('/new', [
    check('name', 'nombre obligatorio').not().isEmpty(),
    check('name', 'el nombre debe contener mas caracteres').isLength({min:3}),
    check('email', 'email obligatorio').isEmail(),
    check('password', 'password obligatorio y minimo de 6 caracteres').isLength({min:6}),
], crearUsuario);

//loguear usuario
router.post('/', [
    check('email', 'email obligatorio').isEmail(),
    check('password', 'password obligatorio y minimo de 6 caracteres').isLength({min:6}),
], loguearUsuario);

//validar y revalidar token
router.get('/renew', [], revalidarToken);

module.exports = router;