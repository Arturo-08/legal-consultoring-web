import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  constructor(private ga: GoogleAnalyticsService) {}

  /**
   * Registra un click en el botón de WhatsApp
   * @param seccion - Desde dónde se hizo el click
   * @param abogado - Nombre del abogado (opcional)
   */
  trackWhatsAppClick(seccion: string, abogado?: string): void {
    this.ga.event('whatsapp_click', 'contacto', abogado ? `${seccion} - ${abogado}` : seccion);
  }

  /**
   * Registra una vista de página del blog
   * @param titulo - Título del artículo
   * @param categoria - Categoría del artículo
   */
  trackBlogView(titulo: string, categoria: string): void {
    this.ga.event('blog_article_view', 'contenido', titulo);
  }

  /**
   * Registra el envío del formulario de contacto
   */
  trackFormSubmit(): void {
    this.ga.event('form_submit', 'contacto', 'formulario_web');
  }

  /**
   * Registra scroll hasta una sección
   * @param seccion - Nombre de la sección
   */
  trackSectionView(seccion: string): void {
    this.ga.event('section_view', 'engagement', seccion);
  }
}