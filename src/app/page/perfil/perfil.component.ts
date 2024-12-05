import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export default class PerfilComponent implements OnInit {

  img_url:any;
  nombre:any;
  apellido:any;
  email:any;
  numeroContacto:any;
  ciudad:any;

  constructor( private router:Router
              ){}

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(){
    this.img_url = localStorage.getItem('img_url');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.numeroContacto = localStorage.getItem('numeroContacto');
    this.ciudad = localStorage.getItem('ciudad');
    this.email = localStorage.getItem('email');
  }

  misCompras(){
    this.router.navigate(['/pages/misCompras'])
  }
}
