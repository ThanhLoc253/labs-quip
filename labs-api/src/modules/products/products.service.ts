import { Prisma } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from '../../common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { ProductRequestDto } from './products.dto'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async getProductDetail(id: number): Promise<ProductRequestDto> {
        return this.prisma.product.findUnique({ where: { id: id } })
    }

    async getAllProduct(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { limit = 10, keyword, page = 1 } = input

        const where: Prisma.ProductWhereInput = {}
        if (undefined !== keyword && keyword.length > 0) {
            where.name = { contains: keyword, mode: 'insensitive' }
        }

        const [totalRecords, data] = await Promise.all([
            this.prisma.product.count({ where }),
            this.prisma.product.findMany({ where, skip: limit * (page - 1), take: limit })
        ])
        return { data, totalRecords, page }
    }

    async createProduct(createProduct: ProductRequestDto) {
        return this.prisma.product.create({ select: { id: true }, data: createProduct })
    }

    async updateProduct(id: number, updateProduct: ProductRequestDto) {
        return this.prisma.product.update({
            where: { id: id },
            data: updateProduct,
            select: { id: true }
        })
    }

    async removeProduct(id: number) {
        return this.prisma.product.delete({
            where: { id: id }
        })
    }
}
