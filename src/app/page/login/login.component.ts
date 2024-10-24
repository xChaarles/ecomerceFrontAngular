import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { UserService } from '../../service/user.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private readonly userService: UserService, private router: Router){}


  async login(){
    if (!this.email || !this.password) { //Validamos si el email o la contraseña no tengan campos vacios
      this.showError("El Email y la Contraseña son requeridos"); // si alguno no cumple mostrara este error
      return
    }
    try{
      const response = await this.userService.login(this.email, this.password);
      console.log('Response:', response);
      if(response.statusCode == 200){
        localStorage.setItem('token', response.token) //almacena el token en el localstorage de la pagina
        localStorage.setItem('role', response.role)   //almacena el tipo de rol si es usuario o admin
        localStorage.setItem('img_url', response.img_url || '')
        localStorage.setItem('userId', response.id)
        
        const redirecto = 'pages/inicio';
        console.log('Redirigiendo a:',redirecto) 
        if(redirecto){
        this.router.navigate([redirecto]).then(() => {
          window.location.reload();
          });
        }
      }else{
        this.showError(response.message) //esto es un mensaje de error si la contraseña sea incorrecta 
      }
    }catch(error:any){
      this.showError(error.message)
    }
  }

  showError(message:string){
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    },3000);
  }

}
