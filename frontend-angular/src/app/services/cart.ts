import { Injectable, signal, computed, effect } from '@angular/core';

export interface CartItem {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  coleccion: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal privada con el estado del carrito
  private cartItems = signal<CartItem[]>([]);

  // Signals públicas de solo lectura
  readonly items = this.cartItems.asReadonly();
  
  // Computed signals (se actualizan automáticamente)
  readonly totalItems = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.cantidad, 0)
  );
  
  readonly totalPrecio = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  );

  constructor() {
    // Cargar carrito guardado al iniciar
    this.cargarCarrito();
    
    // Guardar automáticamente cuando cambie
    effect(() => {
      const carrito = this.cartItems();
      localStorage.setItem('kitsune-cart', JSON.stringify(carrito));
    });
  }

  private cargarCarrito() {
    const guardado = localStorage.getItem('kitsune-cart');
    if (guardado) {
      try {
        this.cartItems.set(JSON.parse(guardado));
      } catch (e) {
        console.error('Error cargando carrito:', e);
      }
    }
  }

  // Métodos públicos
  agregar(producto: any) {
    this.cartItems.update(items => {
      const existente = items.find(i => i.id === producto.id);
      
      if (existente) {
        // Si ya existe, aumentar cantidad
        return items.map(i => 
          i.id === producto.id 
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      } else {
        // Si no existe, agregar nuevo
        return [...items, {
          id: producto.id,
          titulo: producto.titulo,
          precio: producto.precio,
          imagen: producto.imagen,
          coleccion: producto.coleccion,
          cantidad: 1
        }];
      }
    });
  }

  quitar(id: number) {
    this.cartItems.update(items => {
      const existente = items.find(i => i.id === id);
      
      if (existente && existente.cantidad > 1) {
        // Si hay más de 1, reducir cantidad
        return items.map(i =>
          i.id === id
            ? { ...i, cantidad: i.cantidad - 1 }
            : i
        );
      } else {
        // Si solo hay 1, eliminar
        return items.filter(i => i.id !== id);
      }
    });
  }

  eliminar(id: number) {
    this.cartItems.update(items => items.filter(i => i.id !== id));
  }

  vaciar() {
    this.cartItems.set([]);
  }
}
