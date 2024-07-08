import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseClient() {
    const cookieStore = cookies()

    return createServerClient(
        "https://pfssspjkqctybmoitqyv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmc3NzcGprcWN0eWJtb2l0cXl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDE4NTIzOSwiZXhwIjoyMDM1NzYxMjM5fQ.4h5HSvNfloVotkvrggQoj4c76I8s7k9GdHXbVxYuBnk",
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {

                    }
                },
            },
        }
    )
}

export async function getUser() {
    try {
        const supabase = createSupabaseClient();
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError) {
            throw authError;
        }

        const user = authData.user;
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email, displayName, role, photoUrl')
            .eq('id', user.id)
            .single();

        if (userError) {
            throw userError;
        }

        return userData;
    } catch (error) {
        console.error("Unexpected error:", error);
        return null; 
    }
}

export async function protectRoute() {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized")
}