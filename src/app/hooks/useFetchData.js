import { useState, useEffect } from 'react';
import { createSupabaseClient } from '../supabase/client';

function useFetchPage(start, end) {
    const [tasksLength, setTasksLength] = useState(0);
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
            // .order('created_at', { ascending: false });
            .order('id', { ascending: false });

        let { data } = await supabase
            .from('tasks')
            .select('*')
            
        if (error) {
            setError(error);
            setLoading(false);
        } else {
            setTasksLength(data.length);
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

    return { tasks, tasksLength, loading, error, refetch };
}

export default useFetchPage;
