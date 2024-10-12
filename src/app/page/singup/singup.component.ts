import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export default class SingupComponent {

  formData: any = {
    nombre: '',
    apellido: '',
    email: '',
    img_url: '',
    ciudad: '',
    numeroContacto: 3013475147,
    password: '',
    role: ''
  };

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router){}

  singUp(){
    if(!this.formData.nombre || !this.formData.apellido || !this.formData.email || !this.formData.img_url ||
      !this.formData.ciudad || !this.formData.numeroContacto || !this.formData.password){
      this.showError("Por favor, rellene todos los campos")
    }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este usuario?');
    if (!confirmRegistration) {
      return;
    }

    this.formData.role = "USER"
    this.userService.singUp(this.formData).pipe(
      tap(dato =>{
        console.log(dato);
        this.router.navigate(['pages/home']).then(() => {
          window.location.reload();
        });
      },catchError(error => {
        return throwError(() => new Error (error));
      })
      )
    ).subscribe();
  }

  showError(message:string){
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    },3000); 
  }
}
