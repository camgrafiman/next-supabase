// Crear el cliente (consumer) de supabase:
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
// Con esto podré importar la instancia de supabase y usarla en cualquier parte de mi app.