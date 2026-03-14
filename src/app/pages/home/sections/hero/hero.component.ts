import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private whatsapp = inject(WhatsappService);

  onClickWhatsApp() {
    this.whatsapp.openWhatsApp('hero');
  }
}