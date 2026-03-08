import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  ilustracionesDestacadas: any[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cargarIlustraciones();
  }

  cargarIlustraciones() {
    this.http.get('http://localhost:3001/api/proyecto5/angular')
      .subscribe((data: any) => {
        this.ilustracionesDestacadas = data.slice(0, 3);
      });
  }

  // ✅ NUEVA FUNCIÓN PARA AÑADIR AL CARRITO
  anadirAlCarrito(item: any) {
    this.cartService.agregar(item);
    alert('✅ Añadido al carrito');
  }

  // La función comprar() ya no se usa, pero la dejamos por si acaso
  comprar(item: any) {
    this.cartService.agregar(item);
   
    const compra = {
      producto: {
        id: item.id,
        titulo: item.titulo,
        precio: item.precio
      },
      origen: 'angular',
      comprador: 'Nerea Alba Sanz'
    };

    this.http.post('http://localhost:3001/api/proyecto5/ventas', compra)
      .subscribe({
        next: () => {
          console.log('Compra registrada');
          alert('✅ Añadido al carrito');
        },
        error: (err) => {
          console.error('Error al registrar compra:', err);
          alert('❌ Error al registrar la compra');
        }
      });
  }
}