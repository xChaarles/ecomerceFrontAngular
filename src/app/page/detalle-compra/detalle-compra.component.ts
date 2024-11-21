import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../service/carrito.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EpaycoService } from '../../service/epayco.service';

@Component({
  selector: 'app-detalle-compra',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './detalle-compra.component.html',
  styleUrl: './detalle-compra.component.scss'
})
export default class DetalleCompraComponent implements OnInit {

  userId:any;
  carrito: any = {};
  user:any = {};
  detalleCarrito: any [] = [];

  constructor(private CarritoService:CarritoService,
              private epaycoService:EpaycoService
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
    })
  }

  pagar(): void {

    if (!this.carrito || typeof this.carrito.totalAcumulado === 'undefined') {
      console.error('El total acumulado no está definido o carrito es nulo.');
      return;
    }

    const data = {
      name: this.user.nombre,
      apellido: this.user.apellido,
      telefono: this.user.numeroContacto,
      descripcion: 'Pago de productos del carrito',
      currency: 'COP',
      amount: this.carrito.totalAcumulado, // Asegura un formato válido con dos decimales.
      tax_base: '0',
      tax: '0',
      country:'CO',
      lang: 'es'
    }

    this.epaycoService.realizarPago(data)
  }
  

}
