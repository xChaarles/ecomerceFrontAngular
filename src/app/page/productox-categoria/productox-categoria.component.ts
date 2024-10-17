import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ProductoService } from '../../service/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-productox-categoria',
  standalone: true,
  imports: [RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: './productox-categoria.component.html',
  styleUrl: './productox-categoria.component.scss'
})
export default class ProductoxCategoriaComponent implements OnInit {

  producCategory: any [] = [];
  nombreCategoria:any;



  constructor(private categoriaService: CategoriaService,
              private productoService:ProductoService,
              private router: Router,
              private route:ActivatedRoute){}

  ngOnInit(): void {

    this.getAllProductoXCategoria();
  }

  getAllProductoXCategoria(){
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombre')
    console.log(this.nombreCategoria)
    this.productoService.getProductosXCategoria(this.nombreCategoria).subscribe(
      dato => {
        this.producCategory = dato
      }
    )
  }

  detalleProducto(productoId: string){
    this.router.navigate(['/pages/detallePro', productoId])
  }

}
