import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  apiurl = 'https://localhost:8082/'
  private _refreshrequired = new Subject<void>();
  get Refreshrequired() {
    return this._refreshrequired;
  }

  GetAllProducts() {
    return this.http.get(this.apiurl + 'product/GetAll');
  }

  GetProductbycode(code: any) {
    return this.http.get(this.apiurl + 'product/GetByCode?Code=' + code);
  }

  GetCategory() {
    return this.http.get(this.apiurl + 'Master/GetCategory');
  }

  GetColor() {
    return this.http.get(this.apiurl + 'Master/GetAllVariant/C');
  }
  GetSize() {
    return this.http.get(this.apiurl + 'Master/GetAllVariant/S');
  }

  SaveProduct(inputdata: any) {
    return this.http.post(this.apiurl + 'product/SaveProduct', inputdata).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
  }



}
