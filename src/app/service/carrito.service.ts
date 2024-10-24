import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apio:string = "http://localhost:8080"
  constructor(private http :HttpClient) { } 

  addCarrito(productoId: string, cantidad: number, userId:string, token:string):Observable<any>{
    const url = `${this.apio}/user/carrito/${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' : `Bearer ${token}`
    });
    const body = {
      productoId: productoId,
      cantidad: cantidad,
    };
    return this.http.post<any>(url, body, { headers });
  }

  getCarritoPorUser(userId:string, token:string): Observable<any>{
    const url = `${this.apio}/user/get-carrito/${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });
  }

  deleteProductoCarrito(detalleOrdenId:string, userId:string ,token:string):Observable<any>{
    const url = `${this.apio}/user/delete-carrito/${userId}`;
    const params = new HttpParams().set('detalleOrdenId', detalleOrdenId);
    const headers = new HttpHeaders ({
      'Authorization' : `Bearer ${token}`
    });
    
    return this.http.delete<any>(url, { headers, params });
  }
}
