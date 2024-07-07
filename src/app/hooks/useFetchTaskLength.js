
import { useState, useEffect } from 'react';
import { createSupabaseClient } from '../supabase/client';


function useFetchTaskLength() {
    
    const [tasksLength, setTasksLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const supabase = createSupabaseClient();

    const fetchTasks = async () => {
        setLoading(true);
        let { data, error } = await supabase
            .from('tasks')
            .select('*')

        if (error) {
            setError(error);
            setLoading(false);
        } else {
            setTasksLength(data.length);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks()
    }, []);

    return { tasksLength, loading, error };
}

export default useFetchTaskLength;
