import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../../service/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productolist',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './productolist.component.html',
  styleUrl: './productolist.component.scss'
})
export default class ProductolistComponent implements OnInit {

  productos: any [] = [];

  constructor(private productoService: ProductoService, private router: Router){}

  ngOnInit(): void {
    this.getAllProductosAdmin();
  }

  getAllProductosAdmin(){
    const token: any = localStorage.getItem('token');
    this.productoService.getAllProductoAdmin(token).subscribe(
      dato =>{
        this.productos = dato.productoList
      }
    )
  }

  deleteProducto(productoId: string){
    const confirmDelete = confirm("Estas seguro de Eliminar este Usuario?")
    if(confirmDelete){
    const token:any = localStorage.getItem('token');
    this.productoService.deleteProducto(productoId, token).subscribe(dato =>{
      console.log(dato);
      this.getAllProductosAdmin();
    })
    }else{
      throw new Error('Usuario no encontrado')
    }
  }
  
}
