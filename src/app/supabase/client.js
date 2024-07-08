import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseClient() {
  return createBrowserClient(
    "https://pfssspjkqctybmoitqyv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmc3NzcGprcWN0eWJtb2l0cXl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDE4NTIzOSwiZXhwIjoyMDM1NzYxMjM5fQ.4h5HSvNfloVotkvrggQoj4c76I8s7k9GdHXbVxYuBnk"
  )
}