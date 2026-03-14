import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-por-que-elegirnos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './por-que-elegirnos.component.html',
  styleUrl: './por-que-elegirnos.component.scss'
})
export class PorQueElegirnosComponent {
  razones = signal([
    { id: 1, titulo: 'Experiencia Probada', desc: 'Años de trayectoria en Colombia defendiendo derechos.', icono: 'fa-trophy' },
    { id: 2, titulo: 'Atención Personalizada', desc: 'Cada caso es único y recibe un análisis profundo y humano.', icono: 'fa-handshake' },
    { id: 3, titulo: 'Cobertura Nacional', desc: 'Desde Armenia, Quindío, para cualquier rincón del país.', icono: 'fa-map-location-dot' }
  ]);
}