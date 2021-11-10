import { IsNotEmpty, IsString } from 'class-validator'

export class BrandRequestDto {
    @IsNotEmpty()
    @IsString()
    brandName: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    description: string
}
