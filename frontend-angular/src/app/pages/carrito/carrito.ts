import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs'; 

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  private readonly BASE_URL = 'http://localhost:3001';

  constructor(
    public cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  finalizarCompra() {
    const itemsActuales = this.cartService.items();
    
    if (itemsActuales.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    console.log('🧾 Preparando peticiones al servidor...');
    
    
    const peticiones: Observable<any>[] = [];

    itemsActuales.forEach(item => {
      
      for (let i = 0; i < item.cantidad; i++) {
        const cuerpoVenta = {
          producto: {
            id: item.id,
            titulo: item.titulo,
            precio: item.precio
          },
          origen: 'angular',
          comprador: 'Nerea Alba Sanz'
        };
        
        const peticion = this.http.post(`${this.BASE_URL}/api/proyecto5/ventas`, cuerpoVenta);
        peticiones.push(peticion);
      }
    });

   
    forkJoin(peticiones).subscribe({
      next: (respuestas) => {
        console.log(`✅ Éxito: Se han registrado ${respuestas.length} ventas.`);
        alert('✅ Compra realizada con éxito. ¡Gracias!');
        
        
        this.cartService.vaciar();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('❌ Error al registrar la compra:', err);
        alert('Hubo un fallo al conectar con el servidor. Revisa si el backend está encendido.');
      }
    });
  }
}