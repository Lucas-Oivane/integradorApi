
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class ComparativoDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  produtos: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  mercados: string[];
}
