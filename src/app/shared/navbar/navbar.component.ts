import { Component, ChangeDetectionStrategy, signal, inject, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  
  scrolled = signal(false);
  private scrollListener!: () => void;

  isBlogRoute(): boolean {
    return this.router.url.includes('/blog');
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = () => {
        const isScrolled = window.scrollY > 50;
        if (isScrolled !== this.scrolled()) {
          this.ngZone.run(() => {
            this.scrolled.set(isScrolled);
          });
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}