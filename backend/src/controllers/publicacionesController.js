const { supabase } = require('../config/supabase');
const { obtenerMunicipioIdPorNombre } = require('../utils/helpers');

exports.crearPublicacion = async (req, res) => {
    try {
        const { emprendedorId, titulo, descripcion, precio, categoria, municipioNombre } = req.body;

        if (!emprendedorId || !titulo || !descripcion || precio == null) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const municipioId = await obtenerMunicipioIdPorNombre(municipioNombre);

        const { data, error } = await supabase
            .from('publicaciones')
            .insert([
                {
                    emprendedor_id: emprendedorId,
                    titulo,
                    descripcion,
                    precio,
                    categoria,
                    municipio_id: municipioId,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('[DATABASE ERROR] crearPublicacion:', error);
            return res.status(400).json({
                error: 'Error de base de datos al crear publicación',
                message: error.message,
                detail: error.detail
            });
        }

        return res.status(201).json(data);
    } catch (err) {
        console.error('[SERVER ERROR] crearPublicacion:', err);
        return res.status(500).json({
            error: 'Error interno del servidor al crear publicación',
            message: err.message
        });
    }
};

exports.obtenerPublicaciones = async (req, res) => {
    try {
        const { categoria, municipioId } = req.query;
        let query = supabase
            .from('publicaciones')
            .select('*, usuarios(nombre, apellido), municipios(nombre)')
            .eq('estado_moderacion', 'APROBADO')
            .order('creado_en', { ascending: false });

        if (categoria) {
            query = query.eq('categoria', categoria);
        }
        if (municipioId) {
            query = query.eq('municipio_id', municipioId);
        }

        const { data, error } = await query;

        if (error) {
            console.error('[DATABASE ERROR] obtenerPublicaciones:', error);
            return res.status(400).json({
                error: 'Error al obtener publicaciones',
                message: error.message
            });
        }

        return res.json(data);
    } catch (err) {
        console.error('[SERVER ERROR] obtenerPublicaciones:', err);
        return res.status(500).json({
            error: 'Error interno al obtener publicaciones',
            message: err.message
        });
    }
};
