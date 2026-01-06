import { SupabaseClientFactory } from '@auth-supabase/core';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { SupabaseAuthGuard } from './auth.guard';

export interface SupabaseAuthOptions {
  supabaseUrl: string;
  supabaseKey: string;
}

@Global()
@Module({})
export class SupabaseAuthModule {
  static forRoot(options: SupabaseAuthOptions): DynamicModule {
    const supabaseProvider = {
      provide: 'SUPABASE_CLIENT',
      useFactory: () => {
        return SupabaseClientFactory.create({
          supabaseUrl: options.supabaseUrl,
          supabaseKey: options.supabaseKey,
          supabaseOptions: {},
        });
      },
    };

    return {
      module: SupabaseAuthModule,
      providers: [supabaseProvider, SupabaseAuthGuard],
      exports: [supabaseProvider, SupabaseAuthGuard],
    };
  }
}
