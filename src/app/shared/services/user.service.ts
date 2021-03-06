import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database'

import * as firebase from 'firebase/app';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save( user: firebase.User)
  {
   // debugger;
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email
    
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
 }

  // get(uid: string): AngularFireObject<AppUser> {
  //   return this.db.object('/users/'+ uid);
  // }

}
