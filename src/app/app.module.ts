import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';

import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customers/customer.component';
import { HeaderComponent } from './header/header.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

import { DataService } from './services/data.service';
import { PostService } from './services/post.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { PostsComponent } from './posts/posts.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { GithubFollowersService } from './github-followers/github-followers.service';



const routes: Routes = [    
  { path: 'signup', component: SignupFormComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'follower/:username/:id', component: GithubProfileComponent }, 
  { path: 'follower', component: GithubFollowersComponent },
  { path: 'posts', component: PostsComponent }, 
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
  // { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,        
    HomeComponent, 
    CustomerComponent, 
    HeaderComponent,
    SignupFormComponent,
    GithubFollowersComponent,
    GithubProfileComponent,
    PostsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ProductModule
  ],
  providers: [
    DataService, 
    GithubFollowersService, 
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
