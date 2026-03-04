import { createClient } from '@supabase/supabase-js';

// IMPORTANTE:
// 1) Ve a tu proyecto de Supabase.
// 2) Copia la URL del proyecto y la "anon public key".
// 3) Pégalas en las variables de entorno o directamente aquí mientras haces pruebas.

const SUPABASE_URL = 'https://lyzwrbcxkofdtlvlgotx.supabase.co';
const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5endyYmN4a29mZHRsdmxnb3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODQ0OTksImV4cCI6MjA4ODA2MDQ5OX0.xYnTlMHVtQrhB0fiOl77JwtiW7r_IPOaqvXgGMs9qg4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

