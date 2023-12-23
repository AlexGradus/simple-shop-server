import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'app/auth/decorators/auth.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug);
  }

  @Get(':id')
  @Auth()
  async getProductById(@Param('id') id: string) {
    return this.productService.getById(+id);
  }
}
