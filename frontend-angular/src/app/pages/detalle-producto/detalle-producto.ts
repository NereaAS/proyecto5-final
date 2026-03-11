import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProducto implements OnInit {

  producto: any = null;
  error: boolean = false;
  private readonly BASE_URL = 'http://localhost:3001';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const productos: any = {
      1772197634697: {
        titulo: 'Bulma meets Nezuko',
        coleccion: 'Kawaii',
        precio: 25,
        imagen: 'bulma-nezuko.jpg'
      },
      1772197495342: {
        titulo: 'Pocket Dreams',
        coleccion: 'Kawaii',
        precio: 20,
        imagen: 'pokemon.jpg'
      },
      1773247192040: {
        titulo: 'Boku Arcade · Smash!',
        coleccion: 'Kawaii',
        precio: 25,
        imagen: '1773247192040.jpg'
      },
      1773247127580: {
        titulo: 'Respiración del agua · Tanjiro',
        coleccion: 'Shonen',
        precio: 40,
        imagen: '1773247127580.jpg'
      },
      1772197552373: {
        titulo: 'El festín de Sin Rostro',
        coleccion: 'Shonen',
        precio: 30,
        imagen: 'chihiro-ramen.jpg'
      },
      1772197521815: {
        titulo: 'Touka · Alas de libertad',
        coleccion: 'Shonen',
        precio: 30,
        imagen: 'touka.jpg'
      },
      1772989571038: {
        titulo: 'Retumbar · Attack on Titan',
        coleccion: 'Manga',
        precio: 35,
        imagen: 'ataque-titanes.jpg'
      },
      1772197584702: {
        titulo: 'One Piece · Espíritu pirata',
        coleccion: 'Manga',
        precio: 30,
        imagen: 'one-piece.jpg'
      },
      1772197608343: {
        titulo: 'Akaza · Luna superior',
        coleccion: 'Manga',
        precio: 20,
        imagen: 'akaza.jpg'
      },
      1772896540804: {
        titulo: 'Noche de Código · Power',
        coleccion: 'Shonen',
        precio: 40,
        imagen: 'power.jpg'
      },
      1773246952138: {
        titulo: 'Infinity Sorcerer · Gojo',
        coleccion: 'Manga',
        precio: 30,
        imagen: '1773246952138.jpg'
      }
    };

    this.producto = productos[id];
    if (!this.producto) {
      this.error = true;
    }
  }

  rutaImagen(img: string): string {
    if (!img) return '';
    return `http://localhost:3001/uploads/${img}`;
  }

  anadirAlCarrito(item: any) {
    if (!item) return;
    this.cartService.agregar(item);
    alert('✅ Añadido al carrito');
  }

  ampliarImagen() {
    window.open('http://localhost:3001/uploads/' + this.producto.imagen, '_blank');
  }
}