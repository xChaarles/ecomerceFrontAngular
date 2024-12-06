import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../service/orden.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.scss'
})
export default class TransaccionesComponent implements OnInit {

  ordenes: any = [];

  constructor(private ordenService: OrdenService,
              private router: Router){}

  ngOnInit(): void {
    this.getAllorden()
  }

  getAllorden(){
    const token: any = localStorage.getItem('token')

    this.ordenService.getAllOrdenes(token).subscribe(
      dato => {
        this.ordenes = dato.ordenResList
      })
  }
}