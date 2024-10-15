import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tablas',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.scss'
})
export default class TablasComponent {

}
