import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface ILogoutResponse {
    status: string;
}

// MARK: - Swagger class

export class LogoutResponseDto implements ILogoutResponse {
    @ApiProperty({ example: 'Successful' })
    status: string;
}