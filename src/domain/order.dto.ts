import { IsInt, Min } from 'class-validator';

export class OrderDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
