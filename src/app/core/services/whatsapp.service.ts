import { Injectable, inject } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private analytics = inject(AnalyticsService);
  private readonly BASE_URL = 'https://wa.me/';
  
  // Número general de la firma
  private readonly NUMERO_FIRMA = '573012359951';

  openWhatsApp(seccion: string, numero?: string, mensaje?: string): void {
    // 🔥 Registrar el evento en GA4 ANTES de abrir WhatsApp
    this.analytics.trackWhatsAppClick(seccion);

    const tel = numero || this.NUMERO_FIRMA;
    const texto = encodeURIComponent(
      mensaje || 'Hola, vi su página web y necesito asesoría legal. ¿Pueden ayudarme?'
    );
    window.open(`${this.BASE_URL}${tel}?text=${texto}`, '_blank');
  }

  openWhatsAppAbogado(nombreAbogado: string, numero: string, seccion: string): void {
    // 🔥 Registrar con nombre del abogado para saber cuál recibe más consultas
    this.analytics.trackWhatsAppClick(seccion, nombreAbogado);

    const texto = encodeURIComponent(
      `Hola Dr./Dra. ${nombreAbogado}, vi su perfil en la página web y quisiera una consulta legal.`
    );
    window.open(`${this.BASE_URL}${numero}?text=${texto}`, '_blank');
  }
}