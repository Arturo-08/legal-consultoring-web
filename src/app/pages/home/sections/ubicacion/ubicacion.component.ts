import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ubicacion.component.html'
})
export class UbicacionComponent {
  private whatsapp = inject(WhatsappService);

  onContactar() {
    this.whatsapp.openWhatsApp('ubicacion');
  }
}