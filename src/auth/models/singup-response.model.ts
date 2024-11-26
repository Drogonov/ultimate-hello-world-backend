import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface ISignUpResponse {
    status: string;
}

// MARK: - Swagger class

export class SignUpResponseDto implements ISignUpResponse {
    @ApiProperty({ example: 'Successful' })
    status: string;
}