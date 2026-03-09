import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  menuAbierto = signal(false);
  isScrolled = signal(false);

  navItems = [
    { id: '1', label: 'Servicios', href: '/#servicios' },
    { id: '2', label: 'Equipo', href: '/#equipo' },
    { id: '3', label: 'Cómo Funciona', href: '/#como-funciona' },
    { id: '4', label: 'Ubicación', href: '/#ubicacion' },
    { id: '5', label: 'Contacto', href: '/#contacto' },
    { id: '6', label: 'Blog', href: '/blog' }
  ];

  toggleMenu() {
    this.menuAbierto.update(v => !v);
  }
}