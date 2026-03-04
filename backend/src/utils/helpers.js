const { supabase } = require('../config/supabase');

async function obtenerMunicipioIdPorNombre(nombre) {
    if (!nombre) return null;

    const { data, error } = await supabase
        .from('municipios')
        .select('id')
        .eq('nombre', nombre)
        .maybeSingle();

    if (error) throw error;
    return data ? data.id : null;
}

module.exports = {
    obtenerMunicipioIdPorNombre,
};
