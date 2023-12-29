import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { CartEntity } from 'src/database/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CartEntity])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
