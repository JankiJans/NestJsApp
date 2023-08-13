import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, IsUUID} from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  client: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;
}