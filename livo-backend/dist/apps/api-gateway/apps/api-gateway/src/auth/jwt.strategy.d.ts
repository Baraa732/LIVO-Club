import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        sub: string;
        username: string;
        role: string;
    }): Promise<{
        id: string;
        username: string;
        role: string;
    }>;
}
export {};
