import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-profesores',
  templateUrl: './menu-profesores.component.html',
  styleUrls: ['./menu-profesores.component.css'],
})
export class MenuProfesoresComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void { }
  
  irExamenes() { 
    this.router.navigate(['examenes']);
  }

  irACursos() {
    this.router.navigate(['curso']);
  }
}
