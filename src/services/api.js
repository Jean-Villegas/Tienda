const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });

    const text = await res.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        const message = data?.error || data?.message || `Error HTTP ${res.status}`;
        throw new Error(message);
    }

    return data;
}

// USUARIOS
export async function apiCrearUsuario(payload) {
    // payload: { nombre, apellido, usuario, municipioNombre, passwordHash, telefono, cedula }
    return request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function apiActualizarVerificacionUsuario({ usuarioId, cedula, telefono }) {
    return request('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ usuarioId, cedula, telefono }),
    });
}

export async function apiLogin({ usuario, passwordHash }) {
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ usuario, passwordHash }),
    });
}

// PUBLICACIONES
export async function apiCrearPublicacion({ emprendedorId, titulo, descripcion, precio, categoria, municipioNombre }) {
    return request('/publicaciones', {
        method: 'POST',
        body: JSON.stringify({
            emprendedorId,
            titulo,
            descripcion,
            precio,
            categoria,
            municipioNombre,
        }),
    });
}

export async function apiListarPublicaciones(params = {}) {
    const query = new URLSearchParams(params).toString();
    const path = query ? `/publicaciones?${query}` : '/publicaciones';
    return request(path);
}

// PEDIDOS
export async function apiCrearPedido({ clienteId, adminId, items, total }) {
    return request('/pedidos', {
        method: 'POST',
        body: JSON.stringify({ clienteId, adminId, items, total }),
    });
}

export async function apiListarPedidosAdmin({ adminId }) {
    const query = new URLSearchParams({ adminId }).toString();
    return request(`/admin/pedidos?${query}`);
}

// MUNICIPIOS
export async function apiListarMunicipios() {
    return request('/municipios');
}

