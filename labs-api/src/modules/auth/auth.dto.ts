import { IsNotEmpty, IsString, Length } from 'class-validator'
export class LoginRequestDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    username: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    password: string
}

export class LoginResponseDto {
    accessToken: string

    expireIn: number
}
