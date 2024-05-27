import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'platform'
})
export class CommonService {

  constructor(private messageService: MessageService) {
    // this.showSuccess();
    // this.showInfo();
    // this.showWarn();
    // this.showError();
    // this.showContrast();
    // this.showSecondary();
  }

  showSuccess(summary: string, detail: string, life: number = 5) {
    this.messageService.add({ severity: 'success', summary, detail, life: life * 1000 });
  }

  showInfo(summary: string, detail: string, life: number = 5) {
    this.messageService.add({ severity: 'info', summary, detail, life: life * 1000 });
  }

  showWarn(summary: string, detail: string, life: number = 5) {
    this.messageService.add({ severity: 'warn', summary, detail, life: life * 1000 });
  }

  showError(summary: string, detail: string, life: number = 5) {
    this.messageService.add({ severity: 'error', summary, detail, life: life * 1000 });
  }

  showContrast(summary: string, detail: string, life: number = 5) {
    this.messageService.add({ severity: 'contrast', summary, detail, life: life * 1000 });
  }

  showSecondary(summary: string, detail: string, life: number = 5) {
    this.messageService.add({ severity: 'secondary', summary, detail, life: life * 1000 });
  }
}
