import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
  
})
export class ProductFormComponent  {
  categories$;
  product = {};
  id;
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private categoriesService : CategoryService , 
    private productService : ProductService
  ) 
  { 
      this.categories$ = categoriesService.getAll(); 
      this.id = this.route.snapshot.paramMap.get('id');
     if(this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
     
  }

  save(product){
    if(this.id) 
      this.productService.update(this.id , product);
    else 
      this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure, you want to delete this product?')) return;
      if(this.id) {   
        this.productService.delete(this.id);
        this.router.navigate(['/admin/products']); 
      }    
  }

 

  
}
