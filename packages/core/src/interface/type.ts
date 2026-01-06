import { AuthError, Session, SupabaseClientOptions, User } from "@supabase/supabase-js";

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions<any>;
}



export interface AuthResult {
    user: User | null;
    error: AuthError | null;
    session ?: Session | null;
}
