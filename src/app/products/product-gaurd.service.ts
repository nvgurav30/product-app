import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductGaurdService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(route.paramMap.has('id')) {
      //let id = +route.url[1].path;
      /*
      let id = +route.paramMap.get('id');

      if(isNaN(id) || id < 1)
      {
        alert(`Invalid product id ${id}.`)
        this._router.navigate(['/products']);
        return false;
      }
      */
      return true;
    }
    return false;    
  }
}
