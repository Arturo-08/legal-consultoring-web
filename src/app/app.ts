import { Component, ChangeDetectionStrategy, OnInit, inject, afterNextRender } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`
})
export class App implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  private router = inject(Router);
  
  constructor() {
    afterNextRender(() => {
      // Inicializar AOS en el cliente después de que el DOM esté listo
      AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 80,
        delay: 0,
      });

      // Refrescar AOS para compensar carga asíncrona de fuentes o imágenes grandes
      setTimeout(() => AOS.refresh(), 500);
      setTimeout(() => AOS.refresh(), 1000);

      // Refrescar AOS cada vez que cambiamos de ruta
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        setTimeout(() => AOS.refresh(), 100);
        setTimeout(() => AOS.refresh(), 500);
      });
    });
  }

  ngOnInit() {
    // Configuración SEO Base
    this.title.setTitle('CB Abogacía Humana — Abogados en Armenia, Colombia');
    this.meta.updateTag({ name: 'description', content: 'Solutio Justa: Justicia humana a tu alcance. — Abogados en Armenia, Quindío. Derecho Civil, Penal, Familiar y Laboral. Atención en todo Colombia.' });
  }
}