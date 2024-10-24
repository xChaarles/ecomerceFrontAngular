import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../service/user.service';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  categorias: any [] = [];

  img_url: string | null = null;

  constructor(private userService:UserService,
              private router:Router,
              private categoriaService: CategoriaService){}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      this.isAuthenticated = this.userService.isAuthenticated();
      this.isAdmin = this.userService.isAdmin();
      this.isUser = this.userService.isUser();
  
      // Obtener la imagen del usuario si existe en localStorage
      this.img_url = localStorage.getItem('img_url');  // Verifica si img_url es correcto
      this.getAllCategorias();
    }
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe(
      dato => {
        this.categorias = dato.categoriaProductoList
      }
    )
  }

  productoCategoria(categoria:string){
    this.router.navigate(['/pages/producCategory', categoria]).then (() =>{
      window.location.reload();
    })
  }

  logout(): void{
    this.userService.logOut();
    localStorage.removeItem('img_url');
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['pages/inicio']).then (() => {
      window.location.reload();
    });
  }
}
