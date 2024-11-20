import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../service/carrito.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

}
