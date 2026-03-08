import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

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
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id); 

    this.http.get<any[]>(`${this.BASE_URL}/api/proyecto5/angular`)
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data); 
          this.producto = data.find(item => String(item.id) === String(id));
          console.log('Producto encontrado:', this.producto); // 👈 Para depurar
          if (!this.producto) {
            this.error = true;
          }
        },
        error: (err) => {
          console.error('Error al cargar datos:', err);
          this.error = true;
        }
        
      });
  }

  

  rutaImagen(img: string): string {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `http://localhost:3001/uploads/${img}`;
  }

  comprar(item: any) {
    const compra = {
      producto: {
        id: item.id,
        titulo: item.titulo,
        precio: item.precio
      },
      origen: 'angular',
      comprador: 'Nerea Alba Sanz'
    };

    this.http.post(`${this.BASE_URL}/api/proyecto5/ventas`, compra)
      .subscribe({
        next: () => alert('✅ Compra realizada'),
        error: () => alert('❌ Error al registrar compra')
      });
  }
}