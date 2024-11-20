import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss'
})
export default class CrearCategoriaComponent implements OnInit{
  
  categoriaData: any = {
    cnombre: ''
  };
  errorMessage:string = '';

  constructor(private categoriaService: CategoriaService, private router: Router){}

  ngOnInit(): void {
    
  }

  createCategoria(){
    if(!this.categoriaData.cnombre){
       this.showError("Por Favor llene los campos") 
       return;
    }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a esta categoria?');
    if (!confirmRegistration) {
      return;
    }

    const token: any = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró ningún token');
    }

    this.categoriaService.crearCategoria(this.categoriaData, token).subscribe(
      (dato) => {
      console.log(dato)
      this.router.navigate(['pages/admin/tablas/categorialist']);
      },(error) => {
        this.showError("Error al crear la categoría. Verifica los datos.");
        console.error(error);
      }
    );
  }

  showError(message:string){
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }
}
