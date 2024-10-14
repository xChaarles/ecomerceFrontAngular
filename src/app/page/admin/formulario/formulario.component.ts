import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export default class FormularioComponent {

  constructor(private router:Router){}


}
