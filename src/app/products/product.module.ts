import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {NgxPaginationModule} from 'ngx-pagination';

import { ProductListComponent } from './product-list.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { StarRatingComponent } from '../shared/star-rating.component';
import { ProductService } from './product.service';
import { ProductAddComponent } from './product-add.component';
import { ProductDetailsComponent } from './product-details.component';
import { ProductGaurdService } from './product-gaurd.service';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

import { AppErrorHandler } from '../common/app-error-handler';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/add', component: ProductAddComponent },
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [ProductGaurdService] },
  { path: 'product/edit/:id', component: ProductAddComponent, canActivate: [ProductGaurdService] }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFilterPipe,
    StarRatingComponent,
    ProductAddComponent,
    ProductDetailsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ],  
  providers: [
    ProductService, 
    ProductGaurdService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  exports: []
})
export class ProductModule { }
