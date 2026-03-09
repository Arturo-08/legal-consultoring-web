import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whatsapp-float.component.html'
})
export class WhatsappFloatComponent {
  private whatsapp = inject(WhatsappService);

  onClickFlotante() {
    this.whatsapp.openWhatsApp('boton_flotante');
  }
}