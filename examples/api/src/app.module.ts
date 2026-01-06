import { SupabaseAuthModule } from '@auth-supabase/nest-auth';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    SupabaseAuthModule.forRoot({
      supabaseUrl: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
      supabaseKey: process.env.SUPABASE_ANON_KEY || 'your-anon-key',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
