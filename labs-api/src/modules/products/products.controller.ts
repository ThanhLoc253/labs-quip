import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes } from '@nestjs/common'
import { MainValidationPipe } from 'src/common/validation.pipe'
import { SearchRequestDto } from '../../common/pagination.dto'
import { ProductRequestDto } from './products.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    @UsePipes(new MainValidationPipe())
    async getAll(@Query() query: SearchRequestDto) {
        return this.productService.getAllProduct(query)
    }

    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number): Promise<ProductRequestDto> {
        return this.productService.getProductDetail(id)
    }

    @Post('create')
    @UsePipes(new MainValidationPipe())
    async createProduct(@Body() postData: ProductRequestDto) {
        return this.productService.createProduct(postData)
    }

    @Put(':id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async updateProductById(@Param('id', ParseIntPipe) id: number, @Body() updateProduct: ProductRequestDto) {
        return this.productService.updateProduct(id, updateProduct)
    }

    @Delete(':id')
    async removeProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.removeProduct(id)
    }
}
