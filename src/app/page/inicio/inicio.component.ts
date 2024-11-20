import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoService } from '../../service/carrito.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export default class InicioComponent implements OnInit {

  productos : any [] = [];
  currentSlide = 0;
  cantidad = 1
  private intervalId: any;
  private productoSubscription: Subscription;

  constructor(private productoService:ProductoService,private router: Router, 
              private carritoService: CarritoService){}

  ngOnInit() {
    this.getAllProductos();

    if (this.productos.length > 0) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }

  }

  getAllProductos(){
    this.productoService.getAllProcducto().subscribe(
      dato => {
        this.productos = dato.productoList;

      },error => {
        console.error('Error al obtener los productos:', error); // Log para depurar el error
        alert('Hubo un error al cargar los productos, por favor intente más tarde.');
      }
    )
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
  }

  nextSlide() {
    if (this.productos.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.productos.length;
    }
  }

  prevSlide() {
    if (this.productos.length > 0) {
      this.currentSlide = (this.currentSlide - 1 + this.productos.length) % this.productos.length;
    }
  }

  detalleProducto(productoId: string){
    this.router.navigate(['/pages/detallePro', productoId])
  }

  addCarrito(productoId :string) {    
    const token: any = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (userId && productoId && this.cantidad) { 
      this.carritoService.addCarrito(productoId, this.cantidad, userId, token).subscribe(
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
