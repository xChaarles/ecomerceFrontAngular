import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apip = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  crearProducto(producData:any, token:string):Observable<any>{
    const url = `${this.apip}/admin/create-producto`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url, producData, {headers});
  }

  getAllProcducto():Observable<any>{
    const url = `${this.apip}/public/all-producto`;
    return this.http.get<any>(url);
  }

  getAllProductoAdmin(token:string):Observable<any>{
    const url = `${this.apip}/public/all-producto`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers })
  }


}
