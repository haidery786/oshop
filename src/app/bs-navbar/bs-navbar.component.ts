import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from '../../../node_modules/rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireObject } from '../../../node_modules/angularfire2/database';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
 
  appUser: AppUser;
  cart$: any;
  shoppingTotalItemsCount: number;

  
  constructor(private auth: AuthService , private shoppingCartService : ShoppingCartService) { 
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);  
    
    let cartfb$ = await this.shoppingCartService.getCart();
    this.cart$ = cartfb$.valueChanges()
    .subscribe( cart =>{
        this.shoppingTotalItemsCount = 0;
        for( let productId in cart.items)
        this.shoppingTotalItemsCount += cart.items[productId].quantity;
    });

    
  }
  
  logout(){
    //debugger;
   this.auth.logout();
  }

}
