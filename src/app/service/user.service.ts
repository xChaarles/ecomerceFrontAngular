import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createUser(userData:any, token:string):Observable<any>{
    const url = `${this.api}/auth/singUp`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.post<any>(url, userData, {headers});
  }

  getAllUser(token:string):Observable<any>{
    const url = `${this.api}/admin/all-user`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.get<any>(url, {headers});
  }

  getUserById(userId:string, token:string):Observable<any>{
    const url = `${this.api}/admin/user/${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.get<any>(url, {headers});
  }

  updateUser(userId:string, userData:any, token:string):Observable<any>{
    const url = `${this.api}/admin/update-user/${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.put<any>(url, userData, {headers});
  }

  deleteUser(userId:string, token:string): Observable<any>{
    const url = `${this.api}/admin/delete-user/${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.delete<any>(url, { headers });
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
