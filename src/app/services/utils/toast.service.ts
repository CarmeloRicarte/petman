import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(mensaje: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: mensaje });
  }

  showInfo(mensaje: string) {
    this.messageService.add({ severity: 'info', summary: 'Información', detail: mensaje });
  }

  showWarn(mensaje: string) {
    this.messageService.add({ severity: 'warn', summary: 'Atención', detail: mensaje });
  }

  showError(mensaje: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
  }
}
