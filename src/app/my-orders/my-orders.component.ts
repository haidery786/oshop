import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../order.service";
import { AuthService } from "../auth.service";
import { switchMap, map } from "rxjs/operators";
import "rxjs/add/operator/switchMap";
import { Subscription } from "rxjs";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent {
  //implements OnInit, OnDestroy
  orders;
  orders$;
  userId: string;
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orders$ = authService.user$.pipe(
      map(u => orderService.getOrdersByUser(u.uid))
    );
  }

  // ngOnInit() {
  //   this.userId = "WRJEx7gznHWB5rYJKiZBwin2KNE2";
  //   this.getOrders();
  // }

  // private getOrders() {

  //   if (!this.userId) return;
  //   this.subscription = this.orderService
  //     .getOrdersByUser(this.userId)
  //     .valueChanges()
  //     .subscribe(orders => (this.orders = orders));
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
