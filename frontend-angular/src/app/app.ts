import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from './services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  cartService = inject(CartService);
  router = inject(Router);
  protected readonly title = signal('frontend-angular');
  cartTotal= this.cartService.totalItems;

  terminoBusqueda: string = '';
  buscar(event: any){
    this.terminoBusqueda = event.target.value;
    this.router.navigate(['/explorar']), {
      queryParams: { q: this.terminoBusqueda}
    }
  }


}
