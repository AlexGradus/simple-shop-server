import { Module } from '@nestjs/common';
import { AuthModule } from 'app/auth/auth.module';
import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
