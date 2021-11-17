import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  constructor(private htppClient: HttpClient) { }

  listadoExamenes(): Observable<any> {
    return this.htppClient.get<any>('/api/Examen');
  }
  
  obtenerUnExamen(id: number) : Observable<Examen> {
    return this.htppClient.get<Examen>('/api/Examen/' + id);
  }

  crearExamen(Examen: any): Observable<any> {
    return this.htppClient.post('/api/Examen', Examen);
  }

  borrarExamen(id: number) {
    return this.htppClient.delete('/api/Examen/' + id);
  }

  modificarExamenHttp(Examen: any) {
    return this.htppClient.put('/api/Examen', Examen);
  }
}
