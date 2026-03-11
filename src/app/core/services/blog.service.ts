import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private blogUrl = 'blog/index.json';

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.blogUrl);
  }

  getArticuloContent(archivo: string): Observable<string> {
    return this.http.get(`blog/${archivo}`, { responseType: 'text' });
  }
}