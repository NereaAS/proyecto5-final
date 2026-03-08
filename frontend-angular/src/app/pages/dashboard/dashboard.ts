import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // Angular (CRUD ilustraciones)
  ilustraciones: any[] = [];

  // React (solo lectura)
  librosReact: any[] = [];

  // Ventas / compras
  compras: any[] = [];

  nuevaIlustracion = {
    titulo: '',
    coleccion: '',
    precio: 0
  };

  imagenSeleccionada: File | null = null;
  editandoId: number | null = null;

  mensaje: string = '';

  private readonly BASE_URL = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarIlustraciones();
    this.cargarLibrosReact();
    this.cargarCompras();
  }

  ngAfterViewInit(){
    this.cargarIlustraciones();
  }

  // ---------- Helpers ----------
  rutaImagen(img: string): string {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    const normalizada = img.startsWith('/') ? img : `/${img}`;
    return `${this.BASE_URL}${normalizada}`;
  }

  mostrarColeccion(item: any): string {
    return item?.coleccion || item?.categoria || item?.genero || item?.colección || '—';
  }

  // ---------- GET ----------
  cargarIlustraciones() {
    this.http.get<any[]>(`${this.BASE_URL}/api/proyecto5/angular`)
      .subscribe(data => {
        this.ilustraciones = data || [];
      });
  }

  cargarLibrosReact() {
    this.http.get<any[]>(`${this.BASE_URL}/api/proyecto5/react`)
      .subscribe(data => {
        this.librosReact = data || [];
      });
  }

  cargarCompras() {
    this.http.get<any[]>(`${this.BASE_URL}/api/proyecto5/ventas`)
      .subscribe(data => {
        this.compras = data || [];
      });
  }

  // ---------- FORM ----------
  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event?.target?.files?.[0] ?? null;
  }

  guardar() {
    if (!this.editandoId && !this.imagenSeleccionada) {
      alert('Debes seleccionar una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.nuevaIlustracion.titulo);
    formData.append('coleccion', this.nuevaIlustracion.coleccion);
    formData.append('precio', String(this.nuevaIlustracion.precio));

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    if (this.editandoId) {
      this.http.put(
        `${this.BASE_URL}/api/proyecto5/angular/${this.editandoId}`,
        formData
      ).subscribe(() => {
        this.mensaje = 'Ilustración actualizada correctamente';
        this.resetear();
      });
    } else {
      this.http.post(
        `${this.BASE_URL}/api/proyecto5/angular`,
        formData
      ).subscribe(() => {
        this.mensaje = 'Ilustración creada correctamente';
        this.resetear();
      });
    }
  }

  editar(item: any) {
    this.nuevaIlustracion = {
      titulo: item.titulo,
      coleccion: item.coleccion,
      precio: item.precio
    };
    this.editandoId = item.id;
    this.imagenSeleccionada = null;
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta ilustración?')) return;
    this.http.delete(`${this.BASE_URL}/api/proyecto5/angular/${id}`)
      .subscribe(() => {
        this.cargarIlustraciones();
      });
  }

  verDetalle(item: any) {
    console.log('Ver detalle de:', item);
  }

  resetear() {
    this.nuevaIlustracion = { titulo: '', coleccion: '', precio: 0 };
    this.imagenSeleccionada = null;
    this.editandoId = null;
    this.cargarIlustraciones();
  }
  ngOnDestroy() {
    // Forzar limpieza al salir del componente
  }
}
