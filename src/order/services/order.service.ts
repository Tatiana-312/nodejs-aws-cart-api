import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { Repository } from 'typeorm';
import { CartItem, Product } from 'src/cart';
import { CartEntity } from 'src/database/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async findById(id: string): Promise<Order> {
    const orderEntity: OrderEntity = await this.orderRepository.findOneBy({
      id,
    });

    const cartEntity: CartEntity = await this.cartRepository.findOneBy({
      id: orderEntity.cartId,
    });

    if (!orderEntity) return null;

    return {
      id: orderEntity.id,
      user_id: orderEntity.userId,
      cart_id: orderEntity.cartId,
      payment: orderEntity.payment,
      delivery: orderEntity.delivery,
      comments: orderEntity.comments,
      status: orderEntity.status,
      total: orderEntity.total,
      items: cartEntity.items.map(
        ({ count, productId }) =>
          ({
            count,
            product: { id: productId } as Product,
          } as CartItem),
      ),
    };
  }

  async create(data: OrderEntity): Promise<Order> {
    const order = {
      ...data,
      status: 'inProgress',
    };

    const newOrder = this.orderRepository.create(order);
    await this.orderRepository.save(newOrder);

    return await this.findById(newOrder.id);
  }

  // update(orderId, data) {
  //   const order = this.findById(orderId);

  //   if (!order) {
  //     throw new Error('Order does not exist.');
  //   }

  //   this.orders[orderId] = {
  //     ...data,
  //     id: orderId,
  //   };
  // }
}
