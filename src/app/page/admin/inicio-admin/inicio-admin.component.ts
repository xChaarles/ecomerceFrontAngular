import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdenService } from '../../../service/orden.service';
import { UserService } from '../../../service/user.service';
import { ProductoService } from '../../../service/producto.service';

@Component({
  selector: 'app-inicio-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.scss'
})
export default class InicioAdminComponent implements OnInit {

  ordenes: any = [];
  user:any = [];
  totaluser:any;
  total:number;
  totalTransacciones:number;
  productos: any [] = [];
  productosSinStock :number;

  constructor(private ordenService: OrdenService,
              private router: Router,
              private userService:UserService,
              private productoService: ProductoService
  ){}

  ngOnInit(): void {
    this.getAllorden();
    this.getAllUser();
    this.getAllProductosAdmin();
  }

  getAllorden(){
    const token: any = localStorage.getItem('token')

    this.ordenService.getAllOrdenes(token).subscribe(
      dato => {
        this.ordenes = dato.ordenResList
        this.total = this.ordenes.reduce((acumlador:any, orden:any) => acumlador + (orden.total || 0), 0)
        this.totalTransacciones = this.ordenes.length
      })
  }

  getAllUser(){
    const token: any = localStorage.getItem('token');

    interface UserDto {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      img_url: string;
      ciudad: string;
      numeroContacto: number;
      role: string;
    }
    
    interface UserRes {
      statusCode: number;
      message: string;
      userResList: UserDto[];
    }

    this.userService.getAllUser(token).subscribe(
      (dato:UserRes) => {
        this.user = dato.userResList;
        const filtrarUser = dato.userResList.filter(user => user.role === "USER");
        this.totaluser = filtrarUser.length;
      }
    )
  }

  getAllProductosAdmin(){
    const token: any = localStorage.getItem('token');
    this.productoService.getAllProductoAdmin(token).subscribe(
      dato =>{
        this.productos = dato.productoList
        const filtrarProducto = this.productos.filter(cantidad => cantidad.cantidad === 0);
        this.productosSinStock = filtrarProducto.length;
      }
    )
  }

  detallesOrden(ordenId:string){

  }

}
