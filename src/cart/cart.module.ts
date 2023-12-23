import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity } from '../database/entities/cart.entity';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
