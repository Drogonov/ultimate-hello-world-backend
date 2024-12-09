import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface IErrorFieldResponse {
    fieldCode: string;
    errorMsg: string;
}

export interface IErrorResponse {
    errorMsg?: string;
    errorSubCode: string;
    errorFields?: [IErrorFieldResponse];
};

// MARK: - Swagger class

export class ErrorFieldResponseDto implements IErrorFieldResponse {

    @ApiProperty({ 
        description: "Name of the field which have error",
        example: 'email'
    })
    fieldCode: string;

    @ApiProperty({ example: 'This email already in use'})
    errorMsg: string;
}

export class ErrorResponseDto implements IErrorResponse {
    @ApiProperty({ example: 'This email already in use'})
    errorMsg?: string;

    @ApiProperty({ example: 'EMAIL_ALREADY_IN_USE'})
    errorSubCode: string;

    @ApiProperty({ description: 'Array of fields with specified errors'})
    errorFields?: [ErrorFieldResponseDto];
}