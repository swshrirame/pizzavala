import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:4100/pizza'

  constructor(
    private http: HttpClient) { }

  getProductInfo(id: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url + "/details/" + id, httpOptions)
  }

  filterProducts(categoryId: number) {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      categoryId: categoryId,
    }

    return this.http.post(this.url + "/filter", body, httpOptions)
  }
  searchProducts(text:string) {
   
    console.log(text)
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }


    return this.http.get(this.url + "/search/"+text, httpOptions)
  }
}
