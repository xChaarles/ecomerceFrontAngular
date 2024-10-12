import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
  
  }

  showError(message:string){
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    },3000);
  }

}
