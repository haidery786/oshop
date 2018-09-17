import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "shared/models/app-user";
import { ShoppingCartService } from "../shopping-cart.service";
import { Observable } from "../../../node_modules/rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
