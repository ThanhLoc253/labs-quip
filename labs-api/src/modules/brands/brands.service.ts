import { Injectable } from '@nestjs/common'
import { Prisma } from '.prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { BrandRequestDto } from './brand.dto'
import { PaginationResponseDto, SearchRequestDto } from 'src/common/pagination.dto'

@Injectable()
export class BrandsService {
    constructor(private prisma: PrismaService) {}

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.BrandWhereInput = {}
        if (keyword !== undefined && keyword.length > 0) {
            where.brandName = { contains: keyword, mode: 'insensitive' }
        }
        const [totalRecords, data] = await Promise.all([
            this.prisma.brand.count({ where }),
            this.prisma.brand.findMany({
                where,
                include: {
                    equipments: {
                        select: {
                            equipment: true
                        }
                    },
                    applications: {
                        select: {
                            application: true
                        }
                    }
                },
                skip: limit * (page - 1),
                take: limit,
                orderBy: {
                    brandName: 'asc'
                }
            })
        ])
        return { data, totalRecords, page }
    }

    findOne(id: number): Promise<BrandRequestDto> {
        return this.prisma.brand.findUnique({
            where: {
                id: id
            },
            include: {
                equipments: {
                    select: {
                        equipment: true
                    }
                },
                applications: {
                    select: {
                        application: true
                    }
                }
            }
        })
    }

    async create(createProduct: BrandRequestDto) {
        return this.prisma.brand.create({ select: { id: true }, data: createProduct })
    }

    async update(id: number, updateBrand: BrandRequestDto) {
        return this.prisma.brand.update({
            where: { id: id },
            data: updateBrand,
            select: { id: true }
        })
    }

    async delete(id: number) {
        return this.prisma.brand.delete({ where: { id: id }, select: { id: true } })
    }
}
