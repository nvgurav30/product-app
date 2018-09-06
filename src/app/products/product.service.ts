import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subscription, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppErrorHandler } from '../common/app-error-handler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productUrl = 'http://127.0.0.1:3000/api/products'; 
  private products: IProduct[] = [];
  private count = 0;
  private productUpdated = new Subject<IProduct[]>();

  constructor(private _httpClient: HttpClient, private router: Router) { }

  getProductUpdateListener() {
      return this.productUpdated.asObservable();
  }
  // using NodeJS REST API web service backend/api/products 
  getProducts() {
     this._httpClient.get<any[]>(this._productUrl)
          .pipe(map((productData) => {
            return productData.map(newProduct => {
              return {
                productId: newProduct._id,
                productName: newProduct.productName,
                productCode: newProduct.productCode,
                releaseDate: newProduct.releaseDate,
                description: newProduct.description,
                price: newProduct.price,
                starRating: newProduct.starRating,
                imageUrl: newProduct.imageUrl
              };
            });
          }))
          .subscribe((transformedProduct) => {
            this.products = transformedProduct;
            this.productUpdated.next([...this.products]);
          });
  }

  // using NodeJS REST API web service backend/api/products
  getProductsCount(): Promise<number> {
      return this._httpClient.get<number>(this._productUrl + '/count').toPromise();
  }

  private handleError(err) {
    let errMessage = '';
    if(err.error instanceof Error) {
      errMessage = `An error occured: ${err}`;
    } else {
      errMessage = `Server related error: ${err.status}`;
    }
    // console.log(errMessage);
    return throwError(errMessage);
  }

  // get single product details using id parameter
  getProductById(productId: string): Observable<any> {
    return this._httpClient.get<any>(this._productUrl+ '/'+ productId);
            // .pipe(map((products: any) => products.find((p) => p.productId===productId)))
  }

  deleteProductById(productId: string) {
    return this._httpClient.delete<IProduct>(this._productUrl + '/' + productId)
            .subscribe((data) => {
              const updatedProduct = this.products.filter(product => product.productId !== productId);
              this.products = updatedProduct;
              this.productUpdated.next([...this.products]);
            });
  }
  
  addProduct(product, image: File): void {
    const productData = new FormData();
    productData.append('productName', product.productName);
    productData.append('productCode', product.productCode);
    productData.append('description', product.description);
    productData.append('price', product.price);
    productData.append('starRating', product.starRating);
    productData.append('releaseDate', product.releaseDate);
    productData.append('image', image, product.productName);
    productData.append('imageUrl', product.imageUrl);

    this._httpClient.post<{message: string, product: IProduct}>(this._productUrl + '/add', productData)
            .subscribe((responseData) => {
              const objProduct: IProduct = {
                productId: responseData.product.productId,
                productName: product.productName,
                productCode: product.productCode,
                releaseDate: product.releaseDate,
                description: product.description,
                price: product.price,
                starRating: product.starRating,
                imageUrl: responseData.product.imageUrl
              };
              this.products.push(objProduct);
              this.productUpdated.next([...this.products]);
            },
            this.handleError
          );
  }

  updateProduct(product, image: File | string): void {
    let productData: IProduct | FormData ;
    if(typeof(image) === 'object') {
      productData = new FormData();
      productData.append('productName', product.productName);
      productData.append('productCode', product.productCode);
      productData.append('description', product.description);
      productData.append('price', product.price);
      productData.append('starRating', product.starRating);
      productData.append('releaseDate', product.releaseDate);
      productData.append('image', image, product.productName);
      productData.append('imageUrl', product.imageUrl);
    } else {
      productData = {
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode,
        releaseDate: product.releaseDate,
        description: product.description,
        price: product.price,
        starRating: product.starRating,
        imageUrl: image
      }
    }

    this._httpClient.put<{message: string, data: any}>(this._productUrl + '/' + product.productId, productData)
            .subscribe((responseData) => {
              const updatedProduct = [...this.products];
              const oldProductIndex = updatedProduct.findIndex(p => p.productId === product.productId);
              updatedProduct[oldProductIndex] = <IProduct>productData;
              this.products = updatedProduct;
              this.productUpdated.next([...this.products]);
            });
  }
  
}
