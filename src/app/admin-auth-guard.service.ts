import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

import { map,  switchMap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(switchMap((user: firebase.User) =>
      this.userService.get(user.uid)),
      map((appUser) => appUser.isAdmin));
   }
   
}
