import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

const ADMIN_USER = {
  id: '1',
  email: process.env.ADMIN_EMAIL || 'baraaalrifaee732@gmail.com',
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'baraaalrifaee', 10),
  role: 'admin',
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    if (email !== ADMIN_USER.email) throw new UnauthorizedException('Invalid credentials')
    const valid = await bcrypt.compare(password, ADMIN_USER.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid credentials')
    return { id: ADMIN_USER.id, email: ADMIN_USER.email, role: ADMIN_USER.role }
  }

  async login(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: process.env.JWT_EXPIRES_IN || '24h',
    }
  }

  async refreshToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role }
    return { access_token: this.jwtService.sign(payload) }
  }
}
