"use server";

import { createSupabaseClient } from "@/app/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function createAccountAction(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        const thumbnail = formData.get("thumbnail");
        const displayName = formData.get("name");

        const supabase = createSupabaseClient();
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });
        console.log("signUpError", signUpError)
        if (signUpError) throw signUpError;

        let userId = signUpData.user.id;
        let photoUrl = null;

        if (thumbnail) {
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('profilepictures')
                .upload(userId + "/" + uuidv4(), thumbnail);

            if (uploadError) throw uploadError;
            console.log("uploadError", uploadError)

            photoUrl = uploadData.fullPath; // Use `path` instead of `fullPath` if needed
        }

        const userData = {
            id: userId,
            email,
            displayName,
            role: "member",
            photoUrl,
        };

        const { error: insertError } = await supabase
            .from('users')
            .insert(userData);

        if (insertError) throw insertError;
        console.log("insertError", insertError)

        return { error: null };
    } catch (error) {
        console.log("errorrrrr", error.message)
        return { error: error.message }; // Ensure the error is serializable
    }
}

export async function loginAction(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const supabase = createSupabaseClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        
        return { error: null };
    } catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}

export async function logoutAction() {
    try {

        const supabase = createSupabaseClient();

        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        return { error: null };
    } catch (error) {
        return { error: error.message }; // Ensure the error is serializable
    }
}