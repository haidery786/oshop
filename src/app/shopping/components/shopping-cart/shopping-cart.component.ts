import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  constructor(private ShoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.ShoppingCartService.getCart();

    //   let cart1$: Observable<any>;
    //   let cartId = await this.getOrCreateCartId();
    //   let cartfb$ = this.db.object('/shopping-carts/'+cartId);
    //  cart1$ = this.cart$.valueChanges();
    //   cart1$.subscribe(cart=> {
    //      console.log(cart.shopping);
    //  });
  }

  clearCart() {
    this.ShoppingCartService.clearCart();
  }
}
