import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'blog', 
    loadComponent: () => import('./pages/blog/blog-list/blog-list.component').then(m => m.BlogListComponent) 
  },
  { 
    path: 'blog/:slug', 
    loadComponent: () => import('./pages/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];