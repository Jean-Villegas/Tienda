const bcrypt = require('bcryptjs');
const { supabase } = require('../config/supabase');
const { obtenerMunicipioIdPorNombre } = require('../utils/helpers');

exports.signup = async (req, res) => {
    try {
        console.log('[DEBUG] Entrada a /auth/signup. Body:', req.body);
        const {
            nombre,
            apellido,
            usuario,
            municipioNombre,
            municipio_id,
            passwordHash,
            password_hash,
            telefono,
            cedula
        } = req.body;

        const actualPasswordHash = passwordHash || password_hash;

        if (!nombre || !apellido || !usuario || !actualPasswordHash) {
            console.log('[DEBUG] Faltan datos requeridos!');
            return res.status(400).json({ error: 'Faltan datos requeridos (nombre, apellido, usuario, password)' });
        }

        // HASHING de la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(actualPasswordHash, salt);

        let municipioId = municipio_id;
        if (!municipioId && municipioNombre) {
            console.log('[DEBUG] Buscando municipio por nombre:', municipioNombre);
            municipioId = await obtenerMunicipioIdPorNombre(municipioNombre);
        }

        console.log('[DEBUG] Municipio ID a usar:', municipioId);
        console.log('[DEBUG] Insertando en Supabase...');

        const { data, error } = await supabase
            .from('usuarios')
            .insert([
                {
                    nombre,
                    apellido,
                    usuario,
                    municipio_id: municipioId,
                    telefono: telefono || null,
                    cedula: cedula || null,
                    password_hash: passwordEncriptada,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('[DATABASE ERROR] signup:', error);
            return res.status(error.status || 400).json({
                error: 'Error de base de datos al crear usuario',
                message: error.message,
                code: error.code,
                detail: error.detail
            });
        }

        // Limpiar contraseña del objeto de respuesta por seguridad
        delete data.password_hash;
        return res.status(201).json(data);
    } catch (err) {
        console.error('[SERVER ERROR] /auth/signup', err);
        return res.status(500).json({
            error: 'Error interno del servidor',
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { usuario, passwordHash, password_hash } = req.body;
        const actualPasswordHash = passwordHash || password_hash;

        // Buscamos al usuario por su nombre de usuario
        const { data: user, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('usuario', usuario)
            .maybeSingle();

        if (error) {
            console.error('[DATABASE ERROR] login:', error);
            return res.status(400).json({ error: 'Error al consultar usuario', message: error.message });
        }

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // Comparamos el hash guardado con la contraseña recibida
        const esValida = await bcrypt.compare(actualPasswordHash, user.password_hash);
        if (!esValida) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Limpiar datos sensibles antes de enviar
        delete user.password_hash;
        return res.json(user);
    } catch (err) {
        console.error('[SERVER ERROR] /auth/login', err);
        return res.status(500).json({ error: 'Error interno en login', message: err.message });
    }
};

exports.verify = async (req, res) => {
    try {
        const { usuarioId, cedula, telefono } = req.body;
        if (!usuarioId || !cedula || !telefono) {
            return res.status(400).json({ error: 'Faltan datos requeridos para la verificación' });
        }

        const { data, error } = await supabase
            .from('usuarios')
            .update({
                cedula,
                telefono,
                esta_verificado: true,
            })
            .eq('id', usuarioId)
            .select()
            .single();

        if (error) {
            console.error('[DATABASE ERROR] verify:', error);
            return res.status(400).json({ error: 'Error al actualizar verificación', message: error.message });
        }

        return res.json(data);
    } catch (err) {
        console.error('[SERVER ERROR] /auth/verify', err);
        return res.status(500).json({ error: 'Error en el proceso de verificación', message: err.message });
    }
};
