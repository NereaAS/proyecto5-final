import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// Añadimos withComponentInputBinding y withViewTransitions a la lista de importación
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Aquí es donde añadimos las "herramientas" extra al router
    provideRouter(
      routes, 
      withComponentInputBinding(), // Permite recibir el ID del producto directamente como @Input
      withViewTransitions()        // Limpia el DOM y hace transiciones suaves entre páginas
    ),
    provideHttpClient(),
    importProvidersFrom(FormsModule)
  ]
};