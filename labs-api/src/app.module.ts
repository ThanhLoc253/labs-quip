import { Module } from '@nestjs/common'
import { ProductsModule } from './modules/products/products.module'
import { PrismaService } from './modules/prisma/prisma.service'
import { AuthModule } from './modules/auth/auth.module'
import { UploadsModule } from './modules/uploads/uploads.module'
import { BrandsModule } from './modules/brands/brands.module'

@Module({
    imports: [ProductsModule, AuthModule, UploadsModule, BrandsModule],
    providers: [PrismaService]
})
export class AppModule {}
