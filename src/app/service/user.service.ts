import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:8080"
  constructor(private http: HttpClient) {}

  //metodo de registro
  singUp(userData:any):Observable<Object>{
    return this.http.post<any>(`${this.api}/auth/singUp`, userData);
  }

}
