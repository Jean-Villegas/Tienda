-- Esquema inicial pensado para Postgres / Supabase
-- Podemos ir ajustando según lo que vayas necesitando.

-- 1) Municipios de Trujillo
CREATE TABLE municipios (
    id          serial PRIMARY KEY,
    nombre      text NOT NULL UNIQUE
);

-- 2) Usuarios
-- Nota: password_hash debe contener la contraseña ya hasheada
-- (en Supabase normalmente lo maneja el propio sistema de auth).
CREATE TABLE usuarios (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre          text        NOT NULL,
    apellido        text        NOT NULL,
    usuario         text        NOT NULL UNIQUE, -- username para entrar a la app
    telefono        text,
    cedula          text,
    password_hash   text        NOT NULL,
    rol             text        NOT NULL DEFAULT 'CLIENTE'
                    CHECK (rol IN ('CLIENTE', 'EMPRENDEDOR', 'ADMIN')),
    municipio_id    integer     REFERENCES municipios(id),
    esta_verificado boolean     NOT NULL DEFAULT false,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

-- 3) Solicitudes para ser emprendedor
CREATE TABLE solicitudes_emprendedor (
    id                  bigserial PRIMARY KEY,
    usuario_id          uuid        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    estado              text        NOT NULL DEFAULT 'PENDIENTE'
                        CHECK (estado IN ('PENDIENTE', 'APROBADA', 'RECHAZADA')),
    motivo_rechazo      text,
    fecha_solicitud     timestamptz NOT NULL DEFAULT now(),
    fecha_respuesta     timestamptz
);

-- 4) Publicaciones / productos de emprendedores
CREATE TABLE publicaciones (
    id                  bigserial PRIMARY KEY,
    emprendedor_id      uuid        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo              text        NOT NULL,
    descripcion         text        NOT NULL,
    precio              numeric(12,2) NOT NULL CHECK (precio >= 0),
    stock               integer     NOT NULL DEFAULT 0 CHECK (stock >= 0),
    categoria           text,
    municipio_id        integer     REFERENCES municipios(id),
    imagen_url          text, -- URL pública/firmada en Supabase Storage
    estado_moderacion   text        NOT NULL DEFAULT 'PENDIENTE'
                        CHECK (estado_moderacion IN ('PENDIENTE', 'APROBADO', 'RECHAZADO')),
    motivo_rechazo      text,
    creado_en           timestamptz NOT NULL DEFAULT now()
);

-- 5) Pedidos
-- Nota de negocio:
-- El dinero de cada pedido lo recibe el ADMINISTRADOR.
-- El administrador se encarga de coordinar el delivery y pagar al emprendedor al final del día.
CREATE TABLE pedidos (
    id                      bigserial PRIMARY KEY,
    cliente_id              uuid        NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    total                   numeric(12,2) NOT NULL CHECK (total >= 0),
    estado                  text        NOT NULL DEFAULT 'PENDIENTE'
                                CHECK (estado IN ('PENDIENTE','EN_PROCESO','ENVIADO','COMPLETADO','CANCELADO')),
    admin_id                uuid        REFERENCES usuarios(id), -- administrador que gestiona el pedido
    pagado_a_emprendedor    boolean     NOT NULL DEFAULT false,
    fecha_pagado_emprendedor timestamptz,
    creado_en               timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pedido_items (
    id              bigserial PRIMARY KEY,
    pedido_id       bigint      NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    publicacion_id  bigint      NOT NULL REFERENCES publicaciones(id),
    cantidad        integer     NOT NULL CHECK (cantidad > 0),
    precio_unitario numeric(12,2) NOT NULL CHECK (precio_unitario >= 0)
);

-- 6) Insert de ejemplo para municipios de Trujillo
INSERT INTO municipios (nombre) VALUES
    ('Trujillo'),
    ('Valera'),
    ('Boconó'),
    ('Carvajal'),
    ('Escuque'),
    ('Motatán'),
    ('Pampán'),
    ('Pampanito'),
    ('La Ceiba'),
    ('Miranda'),
    ('Monte Carmelo'),
    ('Sucre'),
    ('Urdaneta')
ON CONFLICT (nombre) DO NOTHING;

