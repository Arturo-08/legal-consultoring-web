import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent {
  private whatsapp = inject(WhatsappService);

  servicios = signal([
    { id: 1, nombre: 'Derecho Civil', desc: 'Asesoría en contratos, responsabilidad civil, y litigios patrimoniales.', icono: 'fa-scale-balanced' },
    { id: 2, nombre: 'Derecho Penal', desc: 'Defensa y representación en todo tipo de procesos penales en Colombia.', icono: 'fa-gavel' },
    { id: 3, nombre: 'Derecho de Familia', desc: 'Divorcios, custodias, alimentos y procesos de filiación y sucesiones.', icono: 'fa-users' },
    { id: 4, nombre: 'Derecho Laboral', desc: 'Reclamación de prestaciones, despidos, y asesoría a trabajadores y empresas.', icono: 'fa-briefcase' },
    { id: 5, nombre: 'Derecho Comercial', desc: 'Constitución de sociedades, contratos mercantiles y cobro de cartera.', icono: 'fa-building' },
    { id: 6, nombre: 'Asesoría Jurídica', desc: 'Consultas generales y elaboración de derechos de petición y tutelas.', icono: 'fa-file-signature' }
  ]);

  onConsultarServicio(nombreServicio: string) {
    this.whatsapp.openWhatsApp(`servicio_${nombreServicio}`);
  }
}