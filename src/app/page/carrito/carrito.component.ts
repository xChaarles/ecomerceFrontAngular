import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../service/orden.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleOrdenService } from '../../service/detalle-orden.service';
import { CarritoService } from '../../service/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export default class CarritoComponent implements OnInit {

  userId:any;
  carrito: any = {};
  user:any = {};
  detalleCarrito: any [] = [];

  constructor(private CarritoService:CarritoService,
              private router:Router,
              private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(){
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
    const token: any = localStorage.getItem('token');
    console.log(token)

    this.CarritoService.getCarritoPorUser(this.userId, token).subscribe( dato => {
      this.carrito = dato;
      this.detalleCarrito = dato.detalles
      console.log(this.detalleCarrito)
      this.user = dato.userDTO
    })
  }

  deleteProdcutoCarrito(detalleOrdenId:string){
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
    const token: any = localStorage.getItem('token');
    console.log(token)

    const confirmdelte = confirm('¿Estás seguro de que deseas registrar a este anime?');
    if (!confirmdelte) {
      return;
    }

    this.CarritoService.deleteProductoCarrito(detalleOrdenId, this.userId, token).subscribe(
      dato => {
        console.log(dato)
        this.getCarrito();
      }
    )

  }

}