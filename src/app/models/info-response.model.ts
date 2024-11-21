import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface IInfoResponse {
    title: string;
    imageUrl: string;
    text: string;
    buttonTitle: string;
    deeplink: string;
}

// MARK: - Swagger class

export class InfoResponseDto {
    @ApiProperty({ example: 'Information Title' })
    title: string;
  
    @ApiProperty({ example: 'https://example.com/image.png' })
    imageUrl: string;
  
    @ApiProperty({ example: 'This is some information text.' })
    text: string;
  
    @ApiProperty({ example: 'Click Here' })
    buttonTitle: string;
  
    @ApiProperty({ example: 'myapp://deeplink' })
    deeplink: string;
  }