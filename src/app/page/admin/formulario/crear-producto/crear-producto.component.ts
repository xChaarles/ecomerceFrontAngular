import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../../service/producto.service';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../service/categoria.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export default class CrearProductoComponent implements OnInit {

  productoData: any = {
    pimgUrl: '',
    pnombre: '',
    pdescripcion: '',
    precio: 0,
    cantidad: 0,
    categoria:''
  };

  categoria: any [] = [];

  errorMessage: string = '';

  constructor(private productoService: ProductoService, private router:Router,private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.getAllCategoria()
  }

  crearProducto(){
    if(!this.productoData.pimgUrl || !this.productoData.pnombre || !this.productoData.pdescripcion || !this.productoData.precio 
      || !this.productoData.cantidad || !this.productoData.categoria){
        this.showError("Por Favor llene todos los campos");
      }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar este producto?');
    if (!confirmRegistration) {
      return;
    }

    const token: any = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró ningún token');
    }

    this.productoService.crearProducto(this.productoData, token).subscribe(dato =>{
      console.log(dato)
      this.router.navigate(['pages/admin/tablas/productolist'])
    });
    
  }

  getAllCategoria(){
    const token: any = localStorage.getItem('token');
    this.categoriaService.getAllCategoriaAdmin(token).subscribe(
      dato => {
        this.categoria = dato.categoriaProductoList
      }
    )
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }


}
