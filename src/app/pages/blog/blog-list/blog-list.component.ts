import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Articulo } from '../../../core/models/articulo.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  
  articulos = signal<Articulo[]>([]);
  cargando = signal(true);

  ngOnInit() {
    this.blogService.getArticulos().subscribe({
      next: (data) => {
        this.articulos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando artículos del blog:', err);
        this.cargando.set(false);
      }
    });
  }
}