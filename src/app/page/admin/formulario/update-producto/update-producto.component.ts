import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../../../service/producto.service';
import { CategoriaService } from '../../../../service/categoria.service';

@Component({
  selector: 'app-update-producto',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './update-producto.component.html',
  styleUrl: './update-producto.component.scss'
})
export default class UpdateProductoComponent implements OnInit {

  productoId: any;
  productoData: any = {};
  categoria: any [] = [];
  errorMessage: string;

  constructor(private productoService: ProductoService,
              private router:Router,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getAllProdcutosByIdAdmin();
    this.getAllCategoriaAdmin();
  }

  getAllCategoriaAdmin(){
    const token: any = localStorage.getItem('token')
    this.categoriaService.getAllCategoriaAdmin(token).subscribe(
      dato => {
        this.categoria = dato.categoriaProductoList
      }
    )
  }

  getAllProdcutosByIdAdmin(){
    this.productoId = this.route.snapshot.paramMap.get('Pid');
    const token: any = localStorage.getItem('token');
    console.log(token)
    console.log(this.productoId)
    if(!this.productoId || !token){
      this.showError("el Usuario o Token son requeridos")
      return;
    }

    this.productoService.getProductoByIdAdmin(this.productoId, token).subscribe(
      dato =>{
        console.log(dato)
        let productoData = dato;
        const {pimgUrl, pnombre, pdescripcion, precio, cantidad, categoria } = productoData.producto;
        console.log(productoData)
        this.productoData = {pimgUrl, pnombre, pdescripcion, precio, cantidad, categoria};
      }
    )
  }

  updateProducto(){
    if(!this.productoData.pimgUrl || !this.productoData.pnombre || !this.productoData.pdescripcion || !this.productoData.precio 
      || !this.productoData.cantidad || !this.productoData.categoria){
        this.showError("Por Favor llene todos los campos");
      }

    const confirmRegistration = confirm('¿Estás seguro de que deseas Actualizar este producto?');
    if (!confirmRegistration) {
      return;
    }

    const token: any = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró ningún token');
    }

    this.productoService.updateProducto(this.productoId, this.productoData, token).subscribe(
      dato =>{
        console.log(this.productoId)
        console.log(dato)
        this.router.navigate(['/pages/admin/tablas/productolist'])
      }
    )
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
