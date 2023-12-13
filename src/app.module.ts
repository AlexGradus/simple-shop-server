import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'app/auth/auth.module';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
