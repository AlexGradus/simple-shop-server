import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'app/user/decorators/user.decorator';
import { Auth } from 'app/auth/decorators/auth.decorator';
import { OrderDto } from 'domain/order.dto';
import { PaymentStatusDto } from 'domain/payment-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId);
  }

  @HttpCode(201)
  @Post('place-order')
  @Auth()
  async placeOrder(
    @Body() body: { items: OrderDto[] },
    @CurrentUser('id') userId: number,
  ) {
    try {
      return this.orderService.placeOrder(body.items, userId);
    } catch (error) {
      return { error: error.message };
    }
  }

  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() dto: PaymentStatusDto) {
    try {
      return this.orderService.updateStatus(dto);
    } catch (error) {
      return { error: error.message };
    }
  }

  @HttpCode(204)
  @Delete(':id')
  @Auth()
  async deleteOrder(
    @Param('id') orderId: string,
    @CurrentUser('id') userId: number,
  ) {
    try {
      return this.orderService.deleteOrder(+orderId, userId);
    } catch (error) {
      return { error: error.message };
    }
  }
}
