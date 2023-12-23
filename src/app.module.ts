import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'app/auth/auth.module';
import { OrderModule } from 'app/order/order.module';
import { ProductModule } from 'app/product/product.module';
import { UserModule } from 'app/user/user.module';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
