import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "shared/services/order.service";
import { AuthService } from "shared/services/auth.service";
import { switchMap, map } from "rxjs/operators";
import "rxjs/add/operator/switchMap";
import { Subscription } from "rxjs";
import { AngularFireDatabase } from "../../../../../node_modules/angularfire2/database";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  
  orders;
  userId;
  //orders$;
  subscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private orderService: OrderService, private authService:AuthService) {
      //this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));    
    }

  ngOnInit() {
      this.userSubscription = this.authService.user$.subscribe(user => (this.getOrders(user.uid)));     
  }

  private getOrders(userId : string){
    
    this.subscription = this.orderService
    .getOrdersByUser(userId)    
    .valueChanges()
    .subscribe(orders => (this.orders = orders));

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}

