import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.product.findMany();
  }

  async getById(id: number) {
    //product not found
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async getBySlug(slug: string) {
    //product not found
    return await this.prisma.product.findUnique({
      where: { slug },
    });
  }
}
