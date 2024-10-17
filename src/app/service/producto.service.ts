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

  deleteProducto(productoId:string, token:string):Observable<any>{
    const url = `${this.apip}/admin/delete-producto/${productoId}`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(url, {headers});
  }

  getProductoByIdAdmin(productoId:string, token:string):Observable<any>{
    const url = `${this.apip}/public/producto/${productoId}`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, {headers})
  }

  getProductoById(productoId:string):Observable<any>{
    const url = `${this.apip}/public/producto/${productoId}`;
    return this.http.get<any>(url)
  }

  updateProducto ( productoId:string, producData:string, token:string): Observable<any>{
    const url = `${this.apip}/admin/update-producto/${productoId}`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(url, producData ,{ headers});
  }

  getProductosXCategoria(categoriaNombre:string ):Observable<any[]>{
    const url = `${this.apip}/public/categoria/${categoriaNombre}`
    return this.http.get<any[]>(url)
  }

}
