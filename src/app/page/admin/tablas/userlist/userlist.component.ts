import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export default class UserlistComponent implements OnInit {

  user: any [] = [];
  errorMessage: string = '';

  constructor(private userService:UserService, private router:Router){}
  ngOnInit(): void {
  this.getAllUser();
  }

  getAllUser(){
    const token: any = localStorage.getItem('token');
    this.userService.getAllUser(token).subscribe(
      (dato) => {
        console.log(dato)
        this.user = dato.userList;
      }
    )
  }

  deleteUser(userId:string){
    const confirmDelete = confirm("Estas seguro de Eliminar este Usuario?")
    if(confirmDelete){
    const token:any = localStorage.getItem('token');
    this.userService.deleteUser(userId, token).subscribe(dato =>{
      console.log(dato);
      this.getAllUser();
    })
    }else{
      throw new Error('Usuario no encontrado')
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
