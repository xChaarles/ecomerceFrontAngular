import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../service/carrito.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EpaycoService } from '../../service/epayco.service';
import { response } from 'express';
import { OrdenService } from '../../service/orden.service';

@Component({
  selector: 'app-detalle-compra',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './detalle-compra.component.html',
  styleUrl: './detalle-compra.component.scss'
})
export default class DetalleCompraComponent implements OnInit {

  userId:any;
  numeroOrden: string;
  carrito: any = {};
  user:any = {};
  ref_payco: string | null;
  detalleCarrito: any [] = [];

  constructor(private CarritoService:CarritoService,
              private epaycoService:EpaycoService,
              private ordenService:OrdenService,
              private route:ActivatedRoute
            ){}
  
    ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(){
    this.userId = localStorage.getItem('userId');
    const token: any = localStorage.getItem('token');

    this.CarritoService.getCarritoPorUser(this.userId, token).subscribe( dato => {
      this.carrito = dato;
      this.detalleCarrito = dato.detalles
      this.user = dato.userDTO
      console.log(this.user)
    })
  }

  iniciarnNumeroOden() {
    this.userId = localStorage.getItem('userId');
    const token: any = localStorage.getItem('token');

    this.ordenService.iniciarOrden(this.userId, token).subscribe( 
      dato => {
        this.numeroOrden = dato.numeroOrden
        console.log(this.numeroOrden);

        this.pagar();
    })
  }

  pagar(): void {
    if (!this.carrito || typeof this.carrito.totalAcumulado === 'undefined') {
      console.error('Faltn datos el usuario o el carrito.');
      return;
    }

    const nombreProducto = this.detalleCarrito.map(producto => producto.nombre).join(',');
    const descripcion = 'Compro :' + nombreProducto;

    this.ref_payco = this.route.snapshot.queryParamMap.get('ref_payco');
    console.log(this.ref_payco)

    const data = {
      name: this.user.nombre,
      apellido: this.user.apellido,
      telefono: this.user.numeroContacto,
      descripcion: descripcion,
      currency: 'COP',
      amount: this.carrito.totalAcumulado, // Asegura un formato válido con dos decimales.
      tax_base: '0',
      tax: '0',
      country:'CO',
      lang: 'es',
      invoice: this.numeroOrden,
      response: 'http://www.localhost:4200/pages/response',
    }

    this.epaycoService.realizarPago(data)
  }
  

}