import { IsNotEmpty, IsPositive, IsString, IsNumber } from 'class-validator'

export class ProductRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    catalogNumber: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    standardPackage: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    cubic: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    ship: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number
}
