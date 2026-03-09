import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  private whatsapp = inject(WhatsappService);

  onClickWhatsApp() {
    this.whatsapp.openWhatsApp('hero');
  }
}