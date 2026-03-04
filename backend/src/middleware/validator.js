const { validationResult, body, query } = require('express-validator');

// Función para manejar los resultados de la validación
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('[VALIDATION ERROR]', errors.array());
        return res.status(400).json({
            error: 'Error de validación',
            details: errors.array()
        });
    }
    next();
};

// Validaciones para Registro
const signupValidation = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').trim().escape(),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio').trim().escape(),
    body('usuario').isLength({ min: 4 }).withMessage('El usuario debe tener al menos 4 caracteres').trim().escape(),
    body('password_hash').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validate
];

// Validaciones para Login
const loginValidation = [
    body('usuario').notEmpty().withMessage('Usuario es requerido'),
    body('password_hash').notEmpty().withMessage('Contraseña es requerida'),
    validate
];

// Validaciones para crear Publicación
const publicacionValidation = [
    body('emprendedorId').isUUID().withMessage('ID de emprendedor inválido'),
    body('titulo').notEmpty().withMessage('El título es obligatorio').isLength({ max: 100 }),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    validate
];

module.exports = {
    signupValidation,
    loginValidation,
    publicacionValidation
};
