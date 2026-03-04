const { supabase } = require('../config/supabase');

exports.obtenerMunicipios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('municipios')
            .select('*')
            .order('nombre', { ascending: true });

        if (error) throw error;

        res.json(data);
    } catch (err) {
        console.error('Error GET /municipios', err);
        res.status(500).json({ error: 'Error al obtener municipios' });
    }
};
