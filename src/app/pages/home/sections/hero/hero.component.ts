import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  private whatsapp = inject(WhatsappService);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  // Carousel data
  carouselImages = [
    { src: '/images/place/cb_place_1.jpeg', alt: 'Lugar de trabajo fachada equipo CB Abogacía humana' },
    { src: '/images/place/cb_place_2.jpeg', alt: 'Lugar de trabajo interior equipo CB Abogacía humana' },
    { src: '/images/place/cb_place_3.jpeg', alt: 'Lugar de trabajo interior 2 equipo CB Abogacía humana' },
    { src: '/images/place/cb_place_4.jpeg', alt: 'Lugar de trabajo fachada 2 externo equipo CB Abogacía humana'}
  ];
  currentImageIndex = signal(0);
  private autoPlayInterval: any;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
      this.destroyRef.onDestroy(() => this.stopAutoPlay());
    }
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextImage() {
    this.currentImageIndex.update(i => (i + 1) % this.carouselImages.length);
    if (isPlatformBrowser(this.platformId)) {
        this.startAutoPlay();
    }
  }

  prevImage() {
    this.currentImageIndex.update(i => (i - 1 + this.carouselImages.length) % this.carouselImages.length);
    if (isPlatformBrowser(this.platformId)) {
        this.startAutoPlay();
    }
  }

  setCurrentImage(index: number) {
    this.currentImageIndex.set(index);
    if (isPlatformBrowser(this.platformId)) {
        this.startAutoPlay();
    }
  }

  onClickWhatsApp() {
    this.whatsapp.openWhatsApp('hero');
  }
}