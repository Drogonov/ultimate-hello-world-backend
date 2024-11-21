import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface IHelloResponse {
    title: string;
    text?: string;
    emoji?: string;
    buttonTitle?: string;
}

// MARK: - Swagger class

export class HelloResponseDto implements IHelloResponse {
    @ApiProperty({ example: 'Hello World' })
    title: string;

    @ApiPropertyOptional({ example: 'How are you?' })
    text?: string;

    @ApiPropertyOptional({ example: '👋' })
    emoji?: string;

    @ApiPropertyOptional({ example: 'Say hello back' })
    buttonTitle?: string;
}