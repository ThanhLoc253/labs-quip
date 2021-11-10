import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EXPIRE_IN } from '../../constants/app.constants'
import { PrismaService } from '../prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: EXPIRE_IN }
        })
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController]
})
export class AuthModule {}
