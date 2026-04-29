import { AuthService } from './auth.service';
import { LoginDto } from '@livo/common';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        token_type: string;
        expires_in: string;
    }>;
    getMe(user: unknown): unknown;
    refresh(user: {
        id: string;
        username: string;
        role: string;
    }): Promise<{
        access_token: string;
    }>;
}
