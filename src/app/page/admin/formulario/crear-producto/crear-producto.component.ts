import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../../service/producto.service';
import { FormsModule } from '@angular/forms';

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

  errorMessage: string = '';

  constructor(private productoService: ProductoService, private router:Router){}

  ngOnInit(): void {
    
  }

  crearProducto(){
    if(!this.productoData.pimgUrl || !this.productoData.pnombre || !this.productoData.pdescripcion || !this.productoData.precio 
      || !this.productoData.cantidad || !this.productoData.categoria){
        this.showError("Por Favor llene todos los campos");
      }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este anime?');
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

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }


}
