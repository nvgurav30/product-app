import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductGaurdService } from './product-gaurd.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  private pageTitle = 'Create New Product';
  private count: number;
  private mode = 'new';
  private isLoading = false;
  private productForm: FormGroup;
  private imagePreview = '';
  private product: IProduct;

  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _productGaurdService: ProductGaurdService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
    productId: new FormControl(''),
    productName: new FormControl('', {validators: [Validators.required, , Validators.minLength(3)]}),
    productCode: new FormControl('', {validators: Validators.required}),
    releaseDate: new FormControl('', {validators: Validators.required}),
    description: new FormControl('', {validators: Validators.required}),
    price: new FormControl('', {validators: Validators.required}),
    starRating: new FormControl('', {validators: Validators.required}),
    imageUrl: new FormControl(''),
    image: new FormControl('', {
                  validators: [Validators.required],
                  asyncValidators: [mimeType]
                })
    });

    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';

        const productId = paramMap.get('id');
        console.log('productId:' + productId);

        this._productService.getProductById(productId)
            .subscribe((productData) => {
              this.product = {
                productId: productData._id,
                productName: productData.productName,
                productCode: productData.productCode,
                releaseDate: productData.releaseDate,
                description: productData.description,
                price: productData.price,
                starRating: productData.starRating,
                imageUrl: productData.imageUrl
              };
              this.productForm.setValue({
                productId: this.product.productId,
                productName: this.product.productName,
                productCode: this.product.productCode,
                releaseDate: this.product.releaseDate,
                description: this.product.description,
                price: this.product.price,
                starRating: this.product.starRating,
                imageUrl: this.product.imageUrl
              });
              this.isLoading = false;
              // setTimeout(() => this.isLoading = false, 500);
            });
      } else {
        this.mode = 'new';
        this.isLoading = false;
        // setTimeout(() => this.isLoading = false, 500);
      }
    });
  }

  get productName() {
    return this.productForm.get('productName');
  }
  get productCode() {
    return this.productForm.get('productCode');
  }
  get releaseDate() {
    return this.productForm.get('releaseDate');
  }
  get description() {
    return this.productForm.get('description');
  }
  get price() {
    return this.productForm.get('price');
  }
  get starRating() {
    return this.productForm.get('starRating');
  }
  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({
      image: file
    });
    this.productForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }
  getProductsCount() {
    this._productService.getProductsCount().then((data) => this.count = data);
  }
  onSave() {
    if (!this.productForm.valid) {
      return false;
    }

    this.product = {
      productId: this.productForm.value.productId,
      productName: this.productForm.value.productName,
      productCode: this.productForm.value.productCode,
      releaseDate: this.productForm.value.releaseDate,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      starRating: this.productForm.value.starRating,
      imageUrl: this.productForm.value.imageUrl
    };

    if (this.mode === 'new') {
      this._productService.addProduct(this.product, this.productName.value.image);
    } else {
      this._productService.updateProduct(this.product, this.productName.value.image);
    }

    this.productForm.reset();
    this._router.navigate(['/products']);
  }

  onCancel() {
    this._router.navigate(['/products']);
  }

}
