import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'app/auth/auth.module';
import { UserModule } from 'app/user/user.module';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
