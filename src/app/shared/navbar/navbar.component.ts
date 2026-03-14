import { Component, ChangeDetectionStrategy, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  // Inyectamos el router para conocer la URL actual
  private router = inject(Router);
  
  scrolled = false;

  // Método que verifica si estamos en la ruta del blog
  isBlogRoute(): boolean {
    return this.router.url.includes('/blog');
  }

  // Tu lógica actual para el scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  isScrolled(): boolean {
    return this.scrolled;
  }
}