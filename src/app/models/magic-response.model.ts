import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface IMagicResponse {
    title: string;
    mainText: string;
    jokeText: string;
    infoText: string;
}

export class MagicResponseDto {
    @ApiProperty({ example: 'Magic Title' })
    title: string;
  
    @ApiProperty({ example: 'Here is some main text.' })
    mainText: string;
  
    @ApiProperty({ example: 'This is a joke text.' })
    jokeText: string;
  
    @ApiProperty({ example: 'Additional info text.' })
    infoText: string;
  }