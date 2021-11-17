import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-profesores',
  templateUrl: './menu-profesores.component.html',
  styleUrls: ['./menu-profesores.component.css'],
})
export class MenuProfesoresComponent{
  constructor(private route: ActivatedRoute, private router: Router) { }

  irExamenes() {
    this.router.navigate(['examenes']);
  }

  irACursos() {
    this.router.navigate(['curso']);
  }

  irPreguntas() {
    this.router.navigate(['preguntas']);
  }

}
