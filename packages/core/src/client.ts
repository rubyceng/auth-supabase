import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfig } from './interface/type';



export class SupabaseClientFactory {
  private static instance: SupabaseClient;

  static create(config: SupabaseConfig): SupabaseClient {
    if (!this.instance) {
      this.instance = createClient(config.supabaseUrl, config.supabaseKey,
        config.supabaseOptions = {}
      );
    }
    return this.instance;
  }
}
