import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; 
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;    
  }

  login() {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {     
    this.afAuth.auth.signOut();
  }

  
  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
      if (user) return this.userService.get(user.uid);
      return of(null);
  
    }));  
  }


}
