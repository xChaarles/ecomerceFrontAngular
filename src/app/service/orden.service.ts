import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apio = "http://localhost:8080";


  constructor(private http: HttpClient) { }
  
  iniciarOrden(userId: string, token:string):Observable<any>{
    const url = `${this.apio}/user/iniciar/${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.post<any>(url, {}, { headers });
  }

  validarTransaccion(ref_payco: string, token:string): Observable<any> {
    const url = `${this.apio}/user/validar-transaccion/${ref_payco}`;
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });
  }

  confirmarCompra( userId:number, ref_payco:string, token:string):Observable<any>{
    const url = `${this.apio}/user/confirmacion`;
    const body = {
      userId: userId,
      ref_payco:ref_payco
    }
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    
    return this.http.post<any>(url,body, {headers})
  }


}