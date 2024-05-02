
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log("token 000", request)//error na aavi ne?
    // const token = request.cookie['token']
    console.log("token",request.cookie)
    console.log("token from heaader -----",request.headers.authorization?.split(' ')[1]);
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException("You are not authenticated");
    }
    return this.authService.verifyToken(token);
  }
}
