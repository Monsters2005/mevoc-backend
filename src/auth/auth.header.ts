import { Request as ExpressRequest } from 'express';
import { User } from 'src/entity/User';
import { RequestUser } from './auth.service';

export interface Request extends ExpressRequest {
  user: RequestUser;
  token: string;
  headers: {
    authorization: string;
  };
}

export class AuthHeader {
  constructor(private request: Request) {}

  getValidToken(): string {
    const authorization = this.request.headers.authorization;
    const authHeader = authorization?.split(',')[0] || authorization;
    const isBearer = authHeader && this.isBearer(authHeader, 'Bearer');
    const token = this.getToken(authHeader);

    if (!isBearer || !token) {
      return this.getToken(authHeader);
    }

    return token;
  }

  private isBearer(authHeader: string, typeToken: string): boolean {
    return authHeader.split(' ')[0] === typeToken;
  }

  private getToken(authHeader: string): string {
    return authHeader.split(' ')[1];
  }
}
