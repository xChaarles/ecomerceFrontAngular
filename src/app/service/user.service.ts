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

  async login(email:string, password:string):Promise<any>{
    const url = `${this.api}/auth/login`
    try{
      const response = this.http.post<any>(url, {email, password}).toPromise();
      return response;
    }catch(error){
      throw error
    }
      
  }

  //Metodoos de autenticacion
  logOut(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }

  isAuthenticated(): boolean{
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role == "ADMIN";
    }
    return false;
  }

  isUser(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role == "USER";
    }
    return false;
  }

}
