import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list("/orders");
  }

  // getOrdersByUser(userId: string) {
  //   // debugger;
  //   if (!userId) return;
  //   return this.db.list("/orders/" + userId + " ");
  // }
  getOrdersByUser(userId: string) {
    return this.db.list("/orders/", ref =>
      ref.orderByChild("userId").equalTo(userId)
    );

    // return this.db
    // .list("/orders/", ref => ref.orderByChild("userId").equalTo(userId))
    // .valueChanges()
    // .subscribe(data => {
    //   console.log(data);
    // });
  }
}
