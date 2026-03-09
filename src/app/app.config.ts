import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

import { routes } from './app.routes';

// Interceptor de seguridad HTTP
export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  const secureReq = req.clone({
    headers: req.headers
      .set('X-Content-Type-Options', 'nosniff')
      .set('X-Frame-Options', 'DENY'),
  });
  return next(secureReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes, 
      withViewTransitions(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })
    ),
    provideHttpClient(withInterceptors([securityInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(NgxGoogleAnalyticsModule.forRoot('G-XXXXXXXXXX')),
    importProvidersFrom(NgxGoogleAnalyticsRouterModule)
  ]
};