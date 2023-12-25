import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity } from './entities/cart.entity';
import 'dotenv/config';
import { OrderEntity } from './entities/order.entity';

const { RDS_HOSTNAME, RDS_PORT, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME } =
  process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: RDS_HOSTNAME,
      port: +RDS_PORT,
      username: RDS_USERNAME,
      password: RDS_PASSWORD,
      database: RDS_DB_NAME,
      entities: [CartEntity, CartItemEntity, OrderEntity],
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
})
export class DatabaseModule {}
