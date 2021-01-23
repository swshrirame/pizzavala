import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:4100/user'

  constructor(
    private http: HttpClient) { }

  getProfile() {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url + "/profile/" + sessionStorage['id'], httpOptions)
  }

  putProfile(id: number, firstName: string, lastName: string, email: string, phone: string) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
    }

    return this.http.put(this.url + "/update-profile/" + id, body, httpOptions)
  }

  changePassword(password: string,id:number) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     token: sessionStorage['token']
    //   })
    // }
    const body =
    {
      password: password
    }
    return this.http.put(this.url + "/change-password/" +id, body)
  }


}
