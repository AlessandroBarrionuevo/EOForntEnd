import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamenesService } from 'src/app/services/examenes.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {

  examenes: any[];

  constructor(private examenService: ExamenesService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerExamenes();
  }

  obtenerExamenes() { 
    this.examenService.listadoExamenes().subscribe(
      (r) => { this.examenes = r; console.log(r);
      },
      (err) => { console.log(err);}
    )
  }

  crearExamen() { 
    this.router.navigate(['crear-examen']);
  }

  modificarExamen(id: number) { 
    this.router.navigate(['modificar-examen', id]);
  }


}
