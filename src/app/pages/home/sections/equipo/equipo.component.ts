import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { Abogado } from '../../../../core/models/abogado.model';

@Component({
  selector: 'app-equipo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './equipo.component.html'
})
export class EquipoComponent {
  private whatsapp = inject(WhatsappService);

  equipo = signal<Abogado[]>([
    {
      id: '1',
      nombre: 'Carlos Edgar Buitrago Peña',
      especialidad: 'Derecho Penal y Civil',
      whatsapp: '573007409013',
      foto: '/assets/images/abogado1.jpg'
    }
  ]);

  onContactarAbogado(abogado: Abogado) {
    this.whatsapp.openWhatsAppAbogado(abogado.nombre, abogado.whatsapp, 'equipo');
  }
}