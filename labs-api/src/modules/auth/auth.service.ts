import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { EXPIRE_IN } from '../../constants/app.constants'
import { PrismaService } from '../prisma/prisma.service'
import { LoginResponseDto } from './auth.dto'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(username: string, password: string): Promise<LoginResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { username: username }
        })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                throw new UnauthorizedException({ message: ['Invalid Username or Password !!!'] })
            }
        } else {
            throw new UnauthorizedException({ message: ['User Not Found !!!'] })
        }
        const accessToken = this.jwtService.sign({ userId: user.id }, { expiresIn: EXPIRE_IN })

        return {
            ...user,
            accessToken: accessToken,
            expireIn: EXPIRE_IN
        }
    }
}
