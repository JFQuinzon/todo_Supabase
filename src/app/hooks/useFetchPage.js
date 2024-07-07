import { useState, useEffect } from 'react';
import { createSupabaseClient } from '../supabase/client';

function useFetchPage(start, end) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const supabase = createSupabaseClient();

    const fetchTasks = async (start, end) => {
        setLoading(true);
        let { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .range(start, end)
            .order('id', { ascending: true });

        if (error) {
            setError(error);
            setLoading(false);
        } else {
            setTasks(tasks);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(start, end);
    }, [start, end]);

    const refetch = async () => {
        await fetchTasks(start, end);
    };

    return { tasks, loading, error, refetch };
}

export default useFetchPage;
