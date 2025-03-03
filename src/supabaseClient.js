import { createClient } from "@supabase/supabase-js";

// Load environment variables
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Ensure that required credentials exist
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase credentials are missing! Check your environment variables.");
}

// Create a single Supabase client instance to be shared across the frontend
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    persistSession: true, // Ensures session persistence
    autoRefreshToken: true, // Automatically refresh tokens
    detectSessionInUrl: true, // Detects authentication responses from URL
});

export default supabase;

