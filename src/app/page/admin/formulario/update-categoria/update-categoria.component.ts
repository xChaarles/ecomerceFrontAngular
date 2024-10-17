import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../service/categoria.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-categoria',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './update-categoria.component.html',
  styleUrl: './update-categoria.component.scss'
})
export default class UpdateCategoriaComponent implements OnInit {
  categoriaId:any;
  categoriaData: any = {};
  errorMessage: string = '';

  constructor(private categoriaService:CategoriaService,
              private router: Router,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getAllCategoriaByIdAdmin()
  }

  getAllCategoriaByIdAdmin(){
    this.categoriaId = this.route.snapshot.paramMap.get('Cid');
    const token:any = localStorage.getItem('token');
    this.categoriaService.getCategoriaByIdaAdmin(this.categoriaId, token).subscribe(
      dato => {
        let categoriaData = dato;
        const { cnombre } = categoriaData.categoriaProducto
        this.categoriaData = { cnombre } 
      } 
    )
  }

  updateCategoria(){
    const token:any = localStorage.getItem('token');
    this.categoriaService.updateCategoria(this.categoriaId, this.categoriaData, token).subscribe(
      dato => {
        console.log(dato)
        this.router.navigate(['/pages/admin/tablas/categorialist']);
      }
    )
  }

  
}
