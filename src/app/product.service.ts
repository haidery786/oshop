import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, } from 'angularfire2/database';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsList: AngularFireList<any>;
  products: Observable<any[]>;

  productObj: AngularFireObject<any>;
  product: Observable<any>;

  constructor(private db: AngularFireDatabase) {}

   create(product){
      return this.db.list('/products').push(product);
   }

   getAll(){    
      this.productsList = this.db.list('products');
      // Use snapshotChanges().map() to store the key
      this.products = this.productsList.snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
      return this.products;      
   }

   get(productId){
      this.productObj = this.db.object('/products/'+productId);    
      return this.productObj.valueChanges();
   }

   update(productId , product){
     return this.db.object('/products/' + productId).update(product);
   }

   delete(productId){
      this.productObj = this.db.object('/products/'+productId);    
      return this.productObj.remove();
   }



}
