import { useState, useEffect } from 'react';
import { supabase } from "../../supabase/client";

const useGetCurrentUser = () => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                // Check if there is an active session
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    throw sessionError;
                }
                setSession(sessionData);

                // Proceed to fetch user data if session exists
                if (sessionData?.session) {
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .select('email, displayName, role, photoUrl')
                        .eq('id', sessionData.session.user.id)
                        .single();

                    if (userError) {
                        throw userError;
                    }
                    setUser(userData);
                }

            } catch (err) {
                setError(err);
                console.error("Error fetching user:", err);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    return { session, user, isLoading, error };
};

export default useGetCurrentUser;
