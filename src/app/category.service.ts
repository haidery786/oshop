import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesList: AngularFireList<any>;
  categories: Observable<any[]>;

  constructor(private db: AngularFireDatabase ) { }

  getAll(){
  
    this.categoriesList = this.db.list('/categories', ref => ref.orderByChild('name'));
    // Use snapshotChanges().map() to store the key
    this.categories = this.categoriesList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.categories;      


  }
}
