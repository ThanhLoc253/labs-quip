import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common'
import { MainValidationPipe } from '../../common/validation.pipe'
import { LoginRequestDto } from './auth.dto'
import { AuthService } from './auth.service'
import { UnauthorizedExceptionFilter } from './auth.filter'

@Controller('auth')
@UseFilters(UnauthorizedExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(new MainValidationPipe())
    async login(@Body() { username, password }: LoginRequestDto) {
        return this.authService.login(username, password)
    }
}
