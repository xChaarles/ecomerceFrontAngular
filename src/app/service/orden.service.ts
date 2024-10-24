import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apio: string = "http://localhost:8080"
  constructor(private http: HttpClient) { }
  
}
