import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { BlogService } from '../../../core/services/blog.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { Articulo } from '../../../core/models/articulo.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private analytics = inject(AnalyticsService);
  private sanitizer = inject(DomSanitizer);

  articulo = signal<Articulo | null>(null);
  contenidoMd = signal('');
  cargando = signal(true);
  error = signal('');

  contenidoHtml = computed<SafeHtml>(() => {
    const raw = marked.parse(this.contenidoMd());
    // Safe because the markdown comes from our own assets, not user input
    return this.sanitizer.bypassSecurityTrustHtml(raw as string);
  });

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.error.set('Artículo no encontrado');
      this.cargando.set(false);
      return;
    }

    this.blogService.getArticulos().subscribe({
      next: (articulos) => {
        const found = articulos.find(a => a.slug === slug);
        if (found) {
          this.articulo.set(found);
          this.analytics.trackBlogView(found.titulo, found.categoria);
          this.cargarContenido(found.archivo);
        } else {
          this.error.set('El artículo no existe');
          this.cargando.set(false);
        }
      },
      error: () => {
        this.error.set('Error al cargar la lista de artículos');
        this.cargando.set(false);
      }
    });
  }

  private cargarContenido(archivo: string) {
    this.blogService.getArticuloContent(archivo).subscribe({
      next: (contenido) => {
        this.contenidoMd.set(this.stripMarkdownTitle(contenido));
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el contenido del artículo');
        this.cargando.set(false);
      }
    });
  }

  private stripMarkdownTitle(md: string): string {
    // Elimina el primer encabezado H1 (por ejemplo: "# Título") para no duplicar el título en el HTML
    return md.replace(/^#\s+.*(?:\r?\n)+/, '');
  }
}
