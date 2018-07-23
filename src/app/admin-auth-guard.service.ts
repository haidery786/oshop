import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, mapTo, switchMapTo, switchMap } from "rxjs/operators";
import { UserService } from './user.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth:AuthService , private userService: UserService) { }

  canActivate() : Observable<boolean>
  {  
    return true;
    // return this.auth.user$.pipe(
    //   map(user => this.userService.get(user.uid))                      
    // ).pipe(mapTo(appUser => appUser.isAdmin));      
  }
}
