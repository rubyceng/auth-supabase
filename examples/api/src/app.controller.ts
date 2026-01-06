import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser, SupabaseAuthGuard } from '@rubyceng/nest-auth-supabase';

@Controller('orders')
@UseGuards(SupabaseAuthGuard)
export class AppController {
  @Get()
  getOrders(@CurrentUser() user: any) {
    console.log(`User ${user.email} is requesting orders`);

    return {
      message: 'This is protected business data',
      user_id: user.id,
      email: user.email,
      data: [
        { id: 101, item: 'MacBook Pro', price: 2000 },
        { id: 102, item: 'Mechanical Keyboard', price: 200 },
      ],
    };
  }
}
