import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`
})
export class App implements OnInit {
  
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    // Configuración SEO Base
    this.title.setTitle('CB Abogacía Humana — Abogados en Armenia, Colombia');
    this.meta.updateTag({ name: 'description', content: 'Solutio Justa: Justicia humana a tu alcance. — Abogados en Armenia, Quindío. Derecho Civil, Penal, Familiar y Laboral. Atención en todo Colombia.' });

    // Inicializar AOS para animaciones on-scroll
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,          // Solo anima una vez al hacer scroll
      offset: 80,
      delay: 0,
    });
  }
}