import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Nombre del usuario' })
  @IsString()
  name: string;

  @ApiProperty({
    enum: Role,
    description: 'Rol del usuario',
    default: Role.USER,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.USER;
}
