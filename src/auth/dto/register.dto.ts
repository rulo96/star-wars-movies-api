import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
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
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Nombre del usuario' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'John',
    description: 'Primer nombre del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Apellido del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    enum: Role,
    description: 'Rol del usuario',
    default: Role.USER,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL del avatar del usuario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
