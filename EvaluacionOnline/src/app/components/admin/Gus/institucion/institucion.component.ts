import { Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion.service';



import { Router } from '@angular/router';
import { InstitucionFormComponent } from '../form-institucion/form-institucion.component';
import { IInstitucion } from 'src/app/models/institucion';

@Component({
    templateUrl: './institucion.component.html',
    styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

    public _map: Map<IInstitucion, boolean>;

    public _enableCRUDButtons: boolean;

    public _selectAll: boolean;

    constructor(private institucionService: InstitucionService, private router: Router) {
        this._selectAll = false;

        this._enableCRUDButtons = false;

        this._map = new Map<IInstitucion, boolean>();
    }

    ngOnInit(): void {
        this.GetAllData();
    }

    private GetAllData() {
        this.institucionService.getInstituciones().subscribe(
            instituciones => {
                this._map.clear();

                for (var i = 0; i < instituciones.length; ++i)
                    this._map.set(instituciones[i], false);

                this._enableCRUDButtons = true;
            },
            error => {
                console.error(error);
                this._enableCRUDButtons = true;
            });
    }

    //selecciona TODAS las instituciones
    public selectAll() {
        this._selectAll = !this._selectAll;

        this._map.forEach((value, key) => {
            this._map.set(key, this._selectAll);
        });
    }

    //selecciona UNA institucion
    public select(institucion: IInstitucion, isSelected: boolean) {
        this._map.set(institucion, !isSelected);
    }

    //Envia al form para crear institucion
    public create() : void{
        InstitucionFormComponent._sIsEditMode = false;
        this.router.navigate(["/institucion/", -1]);
    }

    //Envia al form para modificar institucion
    public edit(institucion: IInstitucion): void {
        InstitucionFormComponent._sIsEditMode = true;
        this.router.navigate(["/institucion/", institucion.id]);
    }

    //elimina UNA institucion
    public delete(institucion: IInstitucion): void {
        this._enableCRUDButtons = false;

        this.institucionService.deleteInstitucion(institucion.id).subscribe(
            data => {
                console.log(data);
                console.log(institucion);

                this.GetAllData();
            },
            error => {
                this._enableCRUDButtons = true;
                console.log(error);
            }
        )
    }

    //Elimina las instituciones seleccionadas, una por una
    public deleteSelected(): void {
        this._map.forEach((value, key) => {
            if (value) 
                this.delete(key);
        });

        this._selectAll = false;
    }
}