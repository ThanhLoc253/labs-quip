import { Controller, Get, Param, Query, UsePipes, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { BrandRequestDto } from './brand.dto'
import { SearchRequestDto } from '../../common/pagination.dto'
import { MainValidationPipe } from 'src/common/validation.pipe'

@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get()
    @UsePipes(new MainValidationPipe())
    findAll(@Query() query: SearchRequestDto) {
        return this.brandsService.findAll(query)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<BrandRequestDto> {
        return this.brandsService.findOne(id)
    }

    @Post('create')
    @UsePipes(new MainValidationPipe())
    create(@Body() data: BrandRequestDto) {
        return this.brandsService.create(data)
    }

    @Put('update/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    updateBrandById(@Param('id', ParseIntPipe) id: number, @Body() updateBrand: BrandRequestDto) {
        return this.brandsService.update(id, updateBrand)
    }

    @Delete('delete/:id')
    deleteBrandById(@Param('id', ParseIntPipe) id: number) {
        return this.brandsService.delete(id)
    }
}
