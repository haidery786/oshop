import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Product } from "./models/product";
import "rxjs/add/operator/take";
import { Observable } from "rxjs";
import { ShoppingCart } from "src/app/models/shopping-cart";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async updateQuantity(product: Product, change: number) {
    let quantity = 0;
    let item$: Observable<any>;
    let cartId = await this.getOrCreateCartId();
    let itemfb$ = this.getItem(cartId, product.$key);
    item$ = itemfb$.valueChanges();

    item$.take(1).subscribe(item => {
      //if(item.$exists())
      if (item != null) quantity = item.quantity;
      itemfb$.update({ product: product, quantity: quantity + change });
    });
  }

  async addToCart(product: Product) {
    this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateQuantity(product, -1);
  }
}
