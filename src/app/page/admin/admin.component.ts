import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { fontAwesomeIcons } from '../../shared/font-awesome-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export default class AdminComponent implements OnInit {

  menuOpen: boolean = false; // Estado del menú
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  constructor(private userService:UserService,
              private router:Router){}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
