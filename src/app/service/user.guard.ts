import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const userGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).isAuthenticated()){
    return true;
  }else{
    inject(Router).navigate(['/pages'])
  }
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).isAdmin()){
    return true;
  }else
    inject(Router).navigate(['/pages/login'])
    return false;
}
