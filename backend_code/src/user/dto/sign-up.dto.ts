import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({
        description: 'The email address of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user, with a minimum length of 6 characters',
        minLength: 6,
        example: 'password123',
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The organization the user belongs to',
        example: 'TechCorp',
    })
    @IsNotEmpty()
    organization: string;
}
