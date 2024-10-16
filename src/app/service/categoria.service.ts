import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apic:string = "http://localhost:8080"
  constructor(private http: HttpClient) { }


  crearCategoria(categoriaData: any, token:string):Observable<any>{
    const url = `${this.apic}/admin/create-categoria`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url, categoriaData, { headers });
  }

  getAllCategoria():Observable<any>{
    const url = `${this.apic}/public/get-all-categoria`;
    return this.http.get<any>(url);
  }

  getAllCategoriaAdmin(token:string):Observable<any>{
    const url = `${this.apic}/public/get-all-categoria`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers })
  }

  deleteCategoria(categoriaId:string, token:string):Observable<any>{
    const url = `${this.apic}/admin/delete-categoria/${categoriaId}`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(url, {headers})
  }

}
