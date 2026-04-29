import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        id: string;
        username: string;
        role: string;
    }>;
    login(user: {
        id: string;
        username: string;
        role: string;
    }): Promise<{
        access_token: string;
        token_type: string;
        expires_in: string;
    }>;
    refreshToken(userId: string, username: string, role: string): Promise<{
        access_token: string;
    }>;
}
