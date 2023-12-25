import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartStatuses } from '../../cart/models';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: string;

  @Column({ name: 'updated_at', type: 'date' })
  updatedAt: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cartId, {
    eager: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItemEntity[];
}

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryColumn({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ name: 'count', type: 'integer' })
  count: number;

  @ManyToOne(() => CartEntity)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cartId: CartEntity['id'];
}
