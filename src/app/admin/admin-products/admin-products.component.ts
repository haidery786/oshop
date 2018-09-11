import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private producService:ProductService) {

    this.subscription = this.producService.getAll()
      .subscribe(products => this.filteredProducts=this.products = products) ;

   }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    //console.log(query);
     this.filteredProducts = (query) ?
        this.products.filter(p => p.title.toLowerCase().includes(query.toLocaleLowerCase())) :
        this.products;

  }

}
