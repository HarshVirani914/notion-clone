import { IsArray, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    userId: string;

    @IsArray()
    document: Array<any>
}