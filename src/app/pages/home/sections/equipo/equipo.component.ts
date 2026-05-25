import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { Abogado } from '../../../../core/models/abogado.model';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.scss'
})
export class EquipoComponent {
  private whatsapp = inject(WhatsappService);

  equipo = signal<Abogado[]>([
    {
      id: '1',
      nombre: 'Carlos Edgar Buitrago Peña',
      especialidad: 'Asesor jurídico',
      whatsapp: '573007409013',
      foto: '/images/equipo/carlos_buitrago.png'
    },
    {
      id: '2',
      nombre: 'Carlos Yamit Rodríguez',
      especialidad: 'Abogado penalista',
      whatsapp: '573506051830',
      foto: '/images/equipo/carlos_yamit.png'
    }
  ]);

  onContactarAbogado(abogado: Abogado) {
    this.whatsapp.openWhatsAppAbogado(abogado.nombre, abogado.whatsapp, 'equipo');
  }
}