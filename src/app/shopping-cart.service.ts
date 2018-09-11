import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) {}

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  // async getCart1(){
    
  //   let cart$: Observable<any>;   
  //   let cartId = await this.getOrCreateCartId();
  //   let cartfb$ = this.db.object('/shopping-carts/'+cartId);
  //   cart$ = cartfb$.valueChanges();    
  //    cart$.subscribe(cart=> {        
  //       console.log(cart.items);
  //   });    
  // }

  async getCart() : Promise<Observable<ShoppingCart>>  {
    let cartId = await this.getOrCreateCartId();    
    
    return this.db.object('/shopping-carts/'+ cartId).valueChanges().pipe    
    (
      map(x => new ShoppingCart(x.items))
    );   
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
        
  }

  private getItem(cartId: string , productId: string){
    return this.db.object('/shopping-carts/'+ cartId +'/items/'+ productId);
  }

  private async updateItem(product: Product , change: number){

    let quantity = 0; 
    let item$: Observable<any>;   
    let cartId = await this.getOrCreateCartId();
    let itemfb$ = this.getItem( cartId , product.key);
    item$ = itemfb$.valueChanges();
    
    item$.take(1).subscribe(item => { 
          if(item!=null) quantity= item.quantity;
          itemfb$.update({ 
            title: product.title,
            imageUrl: product.imageUrl,
            price : product.price, 
            quantity: (quantity) + change });
    });    
  }
  
  async addToCart(product: Product){
    this.updateItem(product, 1) ;
  }
  
  async removeFromCart(product: Product){
    this.updateItem(product, -1) ;
  }
}
