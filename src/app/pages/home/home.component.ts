import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from './sections/hero/hero.component';
import { ServiciosComponent } from './sections/servicios/servicios.component';
import { PorQueElegirnosComponent } from './sections/por-que-elegirnos/por-que-elegirnos.component';
import { EquipoComponent } from './sections/equipo/equipo.component';
import { ComoFuncionaComponent } from './sections/como-funciona/como-funciona.component';
import { UbicacionComponent } from './sections/ubicacion/ubicacion.component';
import { ContactoComponent } from './sections/contacto/contacto.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { WhatsappFloatComponent } from '../../shared/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServiciosComponent,
    PorQueElegirnosComponent,
    EquipoComponent,
    ComoFuncionaComponent,
    UbicacionComponent,
    ContactoComponent,
    FooterComponent,
    WhatsappFloatComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}