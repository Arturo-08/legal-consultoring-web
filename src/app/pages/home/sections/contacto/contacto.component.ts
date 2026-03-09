import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
  private analytics = inject(AnalyticsService);
  private whatsapp = inject(WhatsappService);
  private fb = inject(FormBuilder);
  
  enviando = signal(false);
  mensajeExito = signal('');
  mensajeError = signal('');

  contactForm = this.fb.nonNullable.group({
    nombre:   ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.required]],
    asunto:   [''],
    mensaje:  ['', [Validators.required, Validators.minLength(10)]],
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    
    this.enviando.set(true);
    this.mensajeExito.set('');
    this.mensajeError.set('');
    this.analytics.trackFormSubmit();

    try {
      // Envío a Formspree (usar un ID real en producción)
      const res = await fetch('https://formspree.io/f/xbjnzwqz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(this.contactForm.getRawValue()),
      });

      if (res.ok) {
        this.mensajeExito.set('¡Mensaje enviado con éxito! Nos comunicaremos pronto.');
        this.contactForm.reset();
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      this.mensajeError.set('Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      this.enviando.set(false);
    }
  }
  
  onContactarWhatsapp() {
      this.whatsapp.openWhatsApp('contacto');
  }
}