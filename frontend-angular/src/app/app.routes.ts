import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PanelComponent } from './pages/panel/panel';  
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'panel', component: PanelComponent },       
  { path: 'producto/:id', component: DetalleProducto },
  { path: 'contacto', component: Contacto },
  { path: '**', redirectTo: '' }
];