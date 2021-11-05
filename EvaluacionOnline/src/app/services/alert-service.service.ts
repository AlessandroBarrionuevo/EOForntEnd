import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private toast: ToastrService) { }

  toastError(mensaje:any){
    this.toast.error(mensaje, 'ERROR');
  }

  toastSucces(mensaje: any) {
    this.toast.success(mensaje, 'Felicitaciones');
  }

  toastWarning(mensaje: any){
    this.toast.warning(mensaje, 'Peligro');
  }

  animacionSucces(titulo: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  
}
