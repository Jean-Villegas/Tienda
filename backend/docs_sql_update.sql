-- Actualización del esquema para NexStore
-- Estas sentencias SQL agregan lo necesario para Imágenes, Sesiones y Seguridad

-- 1. Agregar campo para la foto de perfil en usuarios
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS foto_perfil_url text;

-- 2. Asegurar que pedidos tenga dirección de envío (puesto que el Admin gestiona el delivery)
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS direccion_envio text;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS telefono_contacto text;

-- 3. Tabla para manejar categorías dinámicamente
CREATE TABLE IF NOT EXISTS categorias (
    id serial PRIMARY KEY,
    nombre text NOT NULL UNIQUE,
    descripcion text,
    imagen_url text
);

-- 4. Insertar algunas categorías iniciales si no existen
INSERT INTO categorias (nombre) VALUES 
('Comida'), ('Artesanía'), ('Ropa'), ('Tecnología'), ('Servicios'), ('Hogar'), ('Salud'), ('Otros')
ON CONFLICT (nombre) DO NOTHING;

-- 5. Vincular publicaciones con la tabla de categorías
-- Primero agregamos la nueva columna
ALTER TABLE publicaciones ADD COLUMN IF NOT EXISTS categoria_id integer REFERENCES categorias(id);

-- Opcional: Migrar datos existentes si ya tenías categorías escritas como texto
-- UPDATE publicaciones p 
-- SET categoria_id = c.id 
-- FROM categorias c 
-- WHERE p.categoria = c.nombre;

-- 6. Eliminar la columna vieja de texto (Opcional, hazlo cuando estés seguro de que todo funciona)
-- ALTER TABLE publicaciones DROP COLUMN IF EXISTS categoria;

-- 6. Tabla de favoritos / wishlist (Para que los clientes guarden lo que les gusta)
CREATE TABLE IF NOT EXISTS favoritos (
    id bigserial PRIMARY KEY,
    usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    publicacion_id bigint NOT NULL REFERENCES publicaciones(id) ON DELETE CASCADE,
    creado_en timestamptz DEFAULT now(),
    UNIQUE(usuario_id, publicacion_id)
);

-- 7. Comentarios y Valoraciones (Fundamental para la confianza en una tienda)
CREATE TABLE IF NOT EXISTS valoraciones (
    id bigserial PRIMARY KEY,
    usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    publicacion_id bigint NOT NULL REFERENCES publicaciones(id) ON DELETE CASCADE,
    puntuacion integer NOT NULL CHECK (puntuacion >= 1 AND puntuacion <= 5),
    comentario text,
    creado_en timestamptz DEFAULT now()
);
