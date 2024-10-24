import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleOrdenService } from '../../service/detalle-orden.service';
import { CarritoService } from '../../service/carrito.service';

@Component({
  selector: 'app-producto-detalles',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.scss'
})
export default class ProductoDetallesComponen implements OnInit {

  productoId:any;
  productoData: any = {}

  producCategory: any [] = [];
  nombreCategoria:any;

  parametros: any = {
    productoid: 0,
    cantidad: 0
  }

  cantidad:number;

  constructor(private productoService: ProductoService,
              private router: Router,
              private route:ActivatedRoute,
              private carritoService: CarritoService){}
  
  ngOnInit(): void {
    this.getProductoById();
  }

  getProductoById(){
    this.productoId = this.route.snapshot.paramMap.get('id');
    this.productoService.getProductoById(this.productoId).subscribe(
      dato =>{
        this.productoData = dato.producto
        this.nombreCategoria = dato.producto.categoria.cnombre
        console.log(this.nombreCategoria)
        this.getAllProductoXCategoria();
      }
    )
  }

  getAllProductoXCategoria(){
    this.productoService.getProductosXCategoria(this.nombreCategoria).subscribe(
      dato => {
        this.producCategory = dato
      }
    )
  }

  detalleProducto(productoId: string){
    this.router.navigate(['/pages/detallePro', productoId]).then(() =>{
      window.location.reload();
    })
  }

  addCarrito() {
    this.productoId = this.route.snapshot.paramMap.get('id');
    const token: any = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (userId && this.productoId && this.cantidad) { 
      this.carritoService.addCarrito(this.productoId, this.cantidad, userId, token).subscribe(
        dato => {
          console.log(dato);
          this.router.navigate(['/pages/carrito']);
        },
        error => {
          console.error('Error al añadir al carrito:', error); // Log de error
        }
      );
    } else {
      console.error('Faltan parámetros necesarios para añadir al carrito');
    }
  }


}
