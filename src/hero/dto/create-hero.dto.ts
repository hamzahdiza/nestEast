import { IsNumber, IsNotEmpty, IsAlpha, IsString, isEmail, IsEmail } from "class-validator";

export class CreateHeroDto {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsString()
    type: string;

    @IsString()
    image: string;
}

export class UpdateHeroDto {
 
    @IsAlpha()
    name: string;

    @IsString()
    type: string;

    image: string;
}