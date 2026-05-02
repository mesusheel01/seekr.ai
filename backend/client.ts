import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
    return createClient(
        "https://jqdslfokyhaulctzycna.supabase.co",
        process.env.SUPABASE_API_KEY!
    )
}
