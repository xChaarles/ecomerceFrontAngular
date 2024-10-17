import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-detalles',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.scss'
})
export default class ProductoDetallesComponen implements OnInit {

  productoId:any;
  productoData: any = {}

  producCategory: any [] = [];
  nombreCategoria:any;



  constructor(private productoService: ProductoService,
              private router: Router,
              private route:ActivatedRoute){}
  
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

}
