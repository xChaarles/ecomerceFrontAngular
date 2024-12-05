import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../service/orden.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.scss'
})
export default class MisComprasComponent implements OnInit {

  userId:any;
  ordenes: any [] = [];

  constructor( private ordenService: OrdenService,
               private router:Router
   ){}
  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(){
    this.userId = localStorage.getItem('userId')
    const token: any = localStorage.getItem('token')

    this.ordenService.getOrdenesUsers(this.userId, token).subscribe(
      dato => {
        console.log(dato)
        this.ordenes = dato;
      }
    )
  }

  detallesOrden(ordenId:string){
    this.router.navigate(['/pages/detalleOrden', ordenId] )
  }

}
