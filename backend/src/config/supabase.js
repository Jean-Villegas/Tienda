const { createClient } = require('@supabase/supabase-js');

// Para no depender del .env mientras pruebas,
// usamos por defecto tu URL y la anon key.
// Si luego quieres usar la service_role, puedes
// rellenar SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el .env.

const SUPABASE_URL =
    process.env.SUPABASE_URL || 'https://lyzwrbcxkofdtlvlgotx.supabase.co';

const SUPABASE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5endyYmN4a29mZHRsdmxnb3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODQ0OTksImV4cCI6MjA4ODA2MDQ5OX0.xYnTlMHVtQrhB0fiOl77JwtiW7r_IPOaqvXgGMs9qg4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase };
