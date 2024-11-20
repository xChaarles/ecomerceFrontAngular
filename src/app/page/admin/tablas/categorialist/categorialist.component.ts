import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../../service/categoria.service';

@Component({
  selector: 'app-categorialist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './categorialist.component.html',
  styleUrl: './categorialist.component.scss'
})
export default class CategorialistComponent implements OnInit {

  categorias: any [] = [];

  constructor(private categoriaService: CategoriaService, private router: Router){}

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias(){
    const token: any = localStorage.getItem('token')
    this.categoriaService.getAllCategoriaAdmin(token).subscribe(
      dato => {
        this.categorias = dato.categoriaProductoList
      }
    )
  }

  deleteCategoria(categoriaId:string){
    const confirmDelete = confirm("Estas seguro de Eliminar esta Categoria?")
    if(confirmDelete){
    const token: any = localStorage.getItem('token');
    this.categoriaService.deleteCategoria(categoriaId, token).subscribe(
      dato => {
        console.log(dato)
        this.getAllCategorias();
      }
    )
    }else{
      throw new Error('Usuario no encontrado')
    }
  }
}
