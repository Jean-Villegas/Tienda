const { supabase } = require('../config/supabase');

exports.crearPedido = async (req, res) => {
    try {
        const { clienteId, adminId, total, items } = req.body;

        if (!clienteId || total == null || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Faltan datos requeridos o items vacíos' });
        }

        const { data: pedido, error: pedidoError } = await supabase
            .from('pedidos')
            .insert([
                {
                    cliente_id: clienteId,
                    admin_id: adminId || null,
                    total,
                },
            ])
            .select()
            .single();

        if (pedidoError) throw pedidoError;

        const itemsPayload = items.map((item) => ({
            pedido_id: pedido.id,
            publicacion_id: item.publicacionId,
            cantidad: item.cantidad,
            precio_unitario: item.precioUnitario,
        }));

        const { error: itemsError } = await supabase.from('pedido_items').insert(itemsPayload);
        if (itemsError) throw itemsError;

        res.status(201).json(pedido);
    } catch (err) {
        console.error('Error /pedidos', err);
        res.status(500).json({ error: 'Error al crear pedido' });
    }
};

exports.listarPedidosAdmin = async (req, res) => {
    try {
        const { adminId } = req.query;
        if (!adminId) {
            return res.status(400).json({ error: 'adminId es requerido' });
        }

        const { data, error } = await supabase
            .from('pedidos')
            .select('id, total, estado, creado_en, pagado_a_emprendedor')
            .eq('admin_id', adminId)
            .order('creado_en', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (err) {
        console.error('Error /admin/pedidos', err);
        res.status(500).json({ error: 'Error al listar pedidos para admin' });
    }
};
