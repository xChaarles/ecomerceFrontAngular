import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-user',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './crear-user.component.html',
  styleUrl: './crear-user.component.scss'
})
export default class CrearUserComponent {

  selectedOption: string = '';

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

  ngOnInit(): void {
    
  }

  crearUser(){
    if(!this.formData.nombre || !this.formData.apellido || !this.formData.email || !this.formData.img_url ||
      !this.formData.ciudad || !this.formData.numeroContacto || !this.formData.password){
      this.showError("Por favor, rellene todos los campos")
    }

    if(this.selectedOption != "" ){
      this.formData.role = this.selectedOption
    }else{
      this.showError("Por favor seleccione un Rol")
      return;
    }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este usuario?');
    if (!confirmRegistration) {
      return;
    }

    const token: any = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró ningún token');
    }

    this.userService.createUser(this.formData, token).subscribe(dato =>{
      console.log(dato)
      this.router.navigate(['pages/admin/tablas/userlist'])
    })

  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
