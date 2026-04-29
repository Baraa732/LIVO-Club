export declare class ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    timestamp: string;
    constructor(data?: T, message?: string, success?: boolean);
    static ok<T>(data: T, message?: string): ApiResponse<T>;
    static fail(message: string): ApiResponse<undefined>;
}
export declare class PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number;
    page: number;
    limit: number;
    constructor(data: T[], total: number, page: number, limit: number);
}
