import { IsInt, IsIn } from 'class-validator';

export class PaymentStatusDto {
  @IsInt()
  orderId: number;

  @IsIn(['PENDING', 'PAYED', 'SHIPPED', 'DELIVERED'])
  status: string;
}
