import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// MARK: - Project implementation

export interface IErrorFieldResponse {
    field: string;
    errorMsg: string;
}

export interface IErrorResponse {
    errorMsg: string;
    errorCode: string;
    errorSubCode: string;
    errorFields?: [IErrorFieldResponse];
};

// MARK: - Swagger class

export class ErrorFieldResponseDto implements IErrorFieldResponse {

    @ApiProperty({ 
        description: "Name of the field which have error",
        example: 'email'
    })
    field: string;

    @ApiProperty({ example: 'This email already in use'})
    errorMsg: string;
}

export class ErrorResponseDto implements IErrorResponse {
    @ApiProperty({ example: 'This email already in use'})
    errorMsg: string;

    @ApiProperty({ example: 'BUSINESS_ERROR'})
    errorCode: string;

    @ApiProperty({ example: 'EMAIL_ALREADY_IN_USE'})
    errorSubCode: string;

    @ApiProperty({ description: 'Array of fields with specified errors'})
    errorFields: [ErrorFieldResponseDto];
}