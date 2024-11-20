import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export default class UpdateUserComponent implements OnInit {

  userId: any;
  userData: any ={};
  errorMessage:string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(){
    this.userId = this.route.snapshot.paramMap.get('id');
    const token :any = localStorage.getItem('token');

    if(!this.userId || !token){
      this.showError("el Usuario o Token son requeridos")
      return;
    }
    this.userService.getUserById(this.userId, token).subscribe(
      (dato) => {
        let userDataResponse = dato
        const {nombre, apellido, email, img_url, ciudad, numeroContacto, role} = userDataResponse.user
        this.userData = {nombre, apellido, email, img_url, ciudad, numeroContacto, role};
      },(error) =>{
        console.log(error)
        this.showError('No se encontro el usuario')
      }
    )
  }

  updateUser(){
    const confirmUpdate = confirm("Deseas Actualizar este usuario?");
    if(!confirmUpdate) return

    const token = localStorage.getItem('token')
      if(!token){
        throw new Error('Token not found')
      }

    this.userService.updateUser(this.userId, this.userData, token).subscribe(
      dato => {
        console.log(dato)
        this.router.navigate(['/pages/admin/tablas/userlist'])
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
