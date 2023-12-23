import { Injectable, NotFoundException } from '@nestjs/common';
import { EnumOrderStatus } from '@prisma/client';
import { OrderDto } from 'domain/order.dto';
import { PaymentStatusDto } from 'domain/payment-status.dto';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async placeOrder(items: OrderDto[], userId: number) {
    const result = await this.prisma.$transaction(async (prisma) => {
      let total = 0;

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || product.quantity < item.quantity) {
          throw new NotFoundException(
            'Product not available in sufficient quantity',
          );
        }

        total += product.price * item.quantity;

        await prisma.product.update({
          where: { id: item.productId, quantity: product.quantity },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      const order = await prisma.order.create({
        data: {
          status: EnumOrderStatus.PENDING,
          user: { connect: { id: userId } },
          total: total,  // Добавьте значение total здесь
          items: {
            create: items.map((item) => ({
              quantity: item.quantity,
              price: 0,
              product: { connect: { id: item.productId } },
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return order;
    });

    return result;
  }

  async updateStatus(dto: PaymentStatusDto) {
    const { orderId, status } = dto;

    if (!Object.values(EnumOrderStatus).includes(status as EnumOrderStatus)) {
      throw new NotFoundException('Invalid order status');
    }

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { status: status as EnumOrderStatus },
    });
  }

  async deleteOrder(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { userId: true },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    await this.prisma.orderItem.deleteMany({ where: { orderId } });
    await this.prisma.order.delete({ where: { id: orderId } });

    return { message: 'Order deleted successfully' };
  }
}
