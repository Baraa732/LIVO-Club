"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const ADMIN_USER = {
    id: '1',
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'livo@admin2026', 10),
    role: 'admin',
};
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        if (username !== ADMIN_USER.username)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(password, ADMIN_USER.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return { id: ADMIN_USER.id, username: ADMIN_USER.username, role: ADMIN_USER.role };
    }
    async login(user) {
        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            token_type: 'Bearer',
            expires_in: process.env.JWT_EXPIRES_IN || '24h',
        };
    }
    async refreshToken(userId, username, role) {
        const payload = { sub: userId, username, role };
        return { access_token: this.jwtService.sign(payload) };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map