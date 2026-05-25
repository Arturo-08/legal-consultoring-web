import { Component, ChangeDetectionStrategy, inject, signal, computed, HostListener, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss',
})
export class ServiciosComponent implements OnInit {
  private whatsapp = inject(WhatsappService);
  private platformId = inject(PLATFORM_ID);

  isExpanded = signal(false);
  isMobile = signal(false);

  servicios = signal([
    {
      id: 1,
      nombre: 'Derecho civil',
      desc: 'Asesoría en contratos, responsabilidad civil, y litigios patrimoniales.',
      icono: 'fa-scale-balanced',
      ofrecemos: [
        'Elaboración de contratos',
        'Demandas civiles',
        'Resolución de conflictos',
        'Divorcios y separaciones',
        'Fijación de cuota alimentaria',
      ],
    },
    {
      id: 2,
      nombre: 'Derecho penal',
      desc: 'Defensa y representación en todo tipo de procesos penales en Colombia.',
      icono: 'fa-gavel',
      ofrecemos: [
        'Defensa penal corporativa',
        'Defensa penal ordinaria, militar y adolescente',
        'Defensa en delitos económicos',
        'Defensa en extición de dominio',
      ],
    },
    {
      id: 3,
      nombre: 'Derecho tributario y aduanero',
      desc: 'Evaluamos, planificamos y defendemos la estrategia fiscal y de comercio exterior.',
      icono: 'fa-users',
      ofrecemos: [
        'Litigios DIAN',
        'Contrabando y aduanas',
        'Planeación tributaria defensiva',
        'Defensa sancionatoria',
        'Riesgo cambiario',
      ],
    },
    {
      id: 4,
      nombre: 'Sector político y gobierno',
      desc: 'Protegemos la carrera de líderes políticos, la legalidad de sus campañas y la estabilidad institucional frente a riesgos legales y reputacionales.',
      icono: 'fa-briefcase',
      ofrecemos: [
        'Derecho electoral',
        'Defensa de funcionarios publicos',
        'Defensa de campañas electorales',
        'Riesgo de disciplinario y fiscal',
        'Proteccion reputacional de figuras publicas',
      ],
    },
    {
      id: 5,
      nombre: 'Responsabilidad en daños',
      desc: 'Defendemos y gestionamos reclamaciones económicas y penales derivadas de siniestros, accidentes y fallas del servicio.',
      icono: 'fa-building',
      ofrecemos: [
        'Accidentes de tránsito',
        'Responsabilidad médica (civil, penal, tribunal de ética médica)',
        'Responsabilidad extracontractual por siniestros',
      ],
    },
    {
      id: 6,
      nombre: 'Investigación criminal y probatoria',
      desc: 'Fortalecemos la estrategia del litigio mediante la obtención legal y científica de pruebas de alta complejidad para asegurar el éxito en tribunales.',
      icono: 'fa-file-signature',
      ofrecemos: [
        'Investigación privada estratégica',
        'Trazabilidad patrimonial',
        'Recolección técnica de prueba',
        'Análisis probatorio',
        'Contrainteligencia jurídica',
        'Perfilamiento de riesgo',
        'Validación digital forense',
      ],
    },
    {
      id: 7,
      nombre: 'Sector contrucción',
      desc: 'Aseguramos proyectos constructivos mediante licencias, cumplimiento ambiental y blindaje sancionatorio.',
      icono: 'fa-helmet-safety',
      ofrecemos: ['Derecho urbanístico', 'Derecho ambiental'],
    },
    {
      id: 8,
      nombre: 'Derecho administrativo',
      desc: 'Defendemos los derechos de particulares y empresas frente a las actuaciones, contratos y decisiones del sector público.',
      icono: 'fa-building-columns',
      ofrecemos: ['Restitución de tierras', 'Contratacion estatal', 'Reparación directa'],
    },
  ]);

  flippedCards = signal<Set<number>>(new Set());

  visibleServicios = computed(() => {
    if (this.isExpanded()) return this.servicios();
    const limit = this.isMobile() ? 4 : 6;
    return this.servicios().slice(0, limit);
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    this.isMobile.set(window.innerWidth < 768);
  }

  toggleExpanded() {
    this.isExpanded.update(val => !val);
  }

  toggleCard(id: number) {
    this.flippedCards.update((cards) => {
      const newSet = new Set(cards);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  isFlipped(id: number): boolean {
    return this.flippedCards().has(id);
  }

  onConsultarServicio(nombreServicio: string, event: Event) {
    event.stopPropagation(); // Evitar que voltee la carta al darle click a consultar
    this.whatsapp.openWhatsApp(`servicio_${nombreServicio}`);
  }
}
