import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFooDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  description: string;
} 