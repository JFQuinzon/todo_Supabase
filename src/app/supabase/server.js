import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseClient() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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