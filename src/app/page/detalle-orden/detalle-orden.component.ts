import { Component, OnInit } from '@angular/core';
import { DetalleOrdenService } from '../../service/detalle-orden.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-compra',
  standalone: true,
  imports: [],
  templateUrl: './detalle-orden.component.html',
  styleUrl: './detalle-orden.component.scss'
})
export default class DetalleOrdenComponent implements OnInit {

  ordenId:any;
  detalleOrden:any [] = [];
  orden:any = {};

  constructor(private detelleOrdenService:DetalleOrdenService,
              private router:Router,
              private route:ActivatedRoute
              ){}

  ngOnInit(): void {
    this.getDetalleOrden();
  }

  getDetalleOrden(){
    this.ordenId = this.route.snapshot.paramMap.get('id');
    const token: any = localStorage.getItem('token');

    this.detelleOrdenService.getDetalleOrdenUser( this.ordenId, token).subscribe(
      dato => {
        this.orden = dato
        this.detalleOrden = dato.detalles
      })
  }

}
