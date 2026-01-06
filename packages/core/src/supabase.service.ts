import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientFactory } from './client';
import { AuthResult, SupabaseConfig } from './interface/type';

export class SupabaseAuthCoreService {
  private supabase: SupabaseClient;

  constructor(options: SupabaseConfig) {
    this.supabase = SupabaseClientFactory.create(options);
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const auth = await this.supabase.auth.signInWithPassword({ email, password });
    return {
      user: auth.data.user,
      session: auth.data.session,
      error: auth.error,
    };
  }

  async register(email: string, password: string): Promise<AuthResult> {
    const auth = await this.supabase.auth.signUp({ email, password });
    return {
      user: auth.data.user,
      session: auth.data.session,
      error: auth.error,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResult> {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    return { user: data.user, session: data.session, error };
  }
}
