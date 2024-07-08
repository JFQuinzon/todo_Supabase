"use server";
import { createSupabaseClient } from "@/app/supabase/server";

export async function createTaskAction(formData) {
  try {
    const supabase = createSupabaseClient();

    const { error: insertError } = await supabase
      .from('tasks')
      .insert(formData);

    if (insertError) throw insertError;

    return { error: null };
  } catch (error) {
    return { error: error.message }; // Ensure the error is serializable
  }
}

export async function updateTaskAction(newFormData) {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('tasks')
      .update(newFormData)
      .eq("id", newFormData.id)
      .select();

    if (data.length === 0) {
      throw new Error("Something went wrong.");
    }

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}
export async function deleteTaskAction(taskID) {
  try {

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq("id", taskID)
      .single()

    if (error) throw new Error("Something went wrong.");

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}