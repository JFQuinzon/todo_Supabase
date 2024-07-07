"use server";
import { createSupabaseClient } from "@/app/supabase/server";

export async function updateTaskAction(newFormData) {
  try {
    console.log(newFormData.title)

    const supabase = createSupabaseClient();

    const { error } = await supabase
      .from('tasks')
      .update({
        title: newFormData.title,
        description: newFormData.description,
        status: newFormData.status,
        deadline: newFormData.deadline,
      })
      .eq("id", newFormData.id)
      .select();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { error: error.message }; // Ensure the error is serializable
  }
}