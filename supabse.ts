import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const options = {
  auth: {
    localStorage: true,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = createClient<Database>(supabaseUrl, supabaseKey, options);

const supabase = () => client;

export default supabase;
