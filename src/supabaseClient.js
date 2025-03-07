import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// ✅ Check if env variables exist
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("🚨 ERROR: Supabase credentials are missing! Check your .env file.");
}

// ✅ Create Supabase Client with session persistence
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true, // ✅ Ensure session persistence
        autoRefreshToken: true, // ✅ Auto-refresh token before expiration
        detectSessionInUrl: true, // ✅ Handle OAuth callbacks properly
    },
});

export default supabase;
