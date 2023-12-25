import { Injectable } from '@nestjs/common';
import { Cart, CartItem, CartStatuses, Product } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity, CartItemEntity } from 'src/database/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cartEntity: CartEntity = await this.cartRepository.findOneBy({
      userId,
    });

    if (!cartEntity) return null;

    return {
      id: cartEntity.id,
      user_id: cartEntity.userId,
      created_at: cartEntity.createdAt,
      updated_at: cartEntity.updatedAt,
      status: cartEntity.status,
      items: cartEntity.items.map(
        ({ count, productId }) =>
          ({
            count,
            product: { id: productId } as Product,
          } as CartItem),
      ),
    };
  }

  async createByUserId(userId: string): Promise<void> {
    const userCart = {
      userId: userId,
      status: CartStatuses.OPEN,
    };

    const newCart = this.cartRepository.create(userCart);
    await this.cartRepository.save(newCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    await this.createByUserId(userId);

    return await this.findByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const {
      id,
      items: arrItems,
      ...rest
    } = await this.findOrCreateByUserId(userId);

    const cartItems = items.map((cartItem) => ({
      cartId: id,
      productId: cartItem.product.id,
      count: cartItem.count,
    }));

    const updatedCart = {
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const createdItems = cartItems.map((cartItem) =>
      this.cartItemRepository.create(cartItem),
    );

    createdItems.map((createdItem) =>
      this.cartItemRepository.save(createdItem),
    );

    await this.cartRepository.update({ userId }, updatedCart);

    return await this.findByUserId(userId);
  }

  async setOrdered(userId: string): Promise<void> {
    const updatedCart = {
      updatedAt: new Date().toISOString().split('T')[0],
      status: CartStatuses.ORDERED,
    };
    await this.cartRepository.update({ userId }, updatedCart);
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
