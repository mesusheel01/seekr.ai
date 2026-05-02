import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://jqdslfokyhaulctzycna.supabase.co",
    "sb_publishable_u6ODl5D840WSwGgZz_watA_gfzV8if7"
  )
}
