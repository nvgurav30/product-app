import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductGaurdService } from './product-gaurd.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product: IProduct;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _productGaurdService: ProductGaurdService
  ) { }

  ngOnInit() {
    const param = this._activatedRoute.snapshot.paramMap.get('id');
    if(param) {      
      const id = param;      
      this.getProductDetails(id);
    }
  }

  getProductDetails(id: string) {
    this._productService.getProductById(id)
        .subscribe(
          (returnProduct) => this.product = returnProduct,
          (err) => console.log('Error:', err),
          () => console.log('Complete the getProductDetails() called.', )
      );
  }

  onBack() {
    this._router.navigate(['/products']);
  }
}
