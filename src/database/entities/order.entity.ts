import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'payment', type: 'json' })
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };

  @Column({ name: 'delivery', type: 'json' })
  delivery: {
    type: string;
    address: any;
  };

  @Column({ name: 'comments', type: 'text' })
  comments: string;

  @Column({
    name: 'status',
    type: 'text',
  })
  status: string;

  @Column({ name: 'total', type: 'integer' })
  total: number;

  @Column({ name: 'cart_id', type: 'uuid' })
  cartId: string;
}
