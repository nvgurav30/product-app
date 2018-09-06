import { Component, OnInit, DoCheck } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { throwError, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private pageTitle: string = 'Product List';
  private showImg: boolean = true;
  private listFilter: string = '';
  private isLoading = false;
  
  products: IProduct[];
  private productsSub: Subscription;
  p: number = 1;

  constructor(private _productService: ProductService) { }

  toggleImage(): void {
    this.showImg = !this.showImg;
  }

  onNotify(message: string): void {
    this.pageTitle = 'Product List: ' + message; 
  }

  onDelete(productId: string) {
    this._productService.deleteProductById(productId);
  }
  ngOnInit() {
    this.isLoading = true;
    this._productService.getProducts();
    this.productsSub = this._productService.getProductUpdateListener()
        .subscribe((products: any[]) => {
            this.products = products;            
            //setTimeout(() => this.isLoading = false, 1000);
            this.isLoading = false;
          });
  }


}
