import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../../order.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.css"]
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders;
  subscription: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.subscription = this.orderService
      .getOrders()
      .valueChanges()
      .subscribe(orders => (this.orders = orders));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
