import { useState } from 'react';
import { supabase } from '../../supabase/client';
import {v4 as uuidv4} from 'uuid'

function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (displayName, email, password, thumbnail) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      let userId = data.user.id;

      // Step 2: Upload photo to Supabase Storage
      let photoUrl = null;
      if (thumbnail) {
        
        const { data: uploadData, error: uploadError } = await supabase.storage 
          .from('profilepictures')
          .upload(userId + "/" + uuidv4(), thumbnail);

        if (uploadError) {
          throw uploadError;
        }
        photoUrl = uploadData.fullPath; 
      }
        
      const userData = {
        id: userId,
        email,
        displayName,
        role: "user",
        photoUrl,
      };

      const { error: insertError } = await supabase
        .from('users')
        .insert(userData);

      if (insertError) {
        throw insertError;
      }
    } catch (error) {
      console.error(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    error,
  };
}

export default useSignup;
