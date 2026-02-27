import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel.html',
  styleUrls: ['./panel.css']
})
export class PanelComponent {
  nuevaIlustracion = {
    titulo: '',
    coleccion: '',
    precio: 0
  };
 
  imagenSeleccionada: File | null = null;
  ilustraciones: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarIlustraciones();
  }

  cargarIlustraciones() {
    this.http.get('http://localhost:3001/api/proyecto5/react')
      .subscribe((data: any) => {
        this.ilustraciones = data;
      });
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
    console.log('Imagen seleccionada:', this.imagenSeleccionada?.name);
  }

  onSubmit() {
    if (!this.imagenSeleccionada) {
      alert('Debes seleccionar una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.nuevaIlustracion.titulo);
    formData.append('coleccion', this.nuevaIlustracion.coleccion);
    formData.append('precio', this.nuevaIlustracion.precio.toString());
    formData.append('imagen', this.imagenSeleccionada);

    this.http.post('http://localhost:3001/api/proyecto5/react', formData)
      .subscribe({
        next: (response: any) => {
          alert('✅ Ilustración subida correctamente');
          this.nuevaIlustracion = { titulo: '', coleccion: '', precio: 0 };
          this.imagenSeleccionada = null;
          this.cargarIlustraciones();
        },
        error: (error) => {
          console.error('Error:', error);
          alert('❌ Error al subir la ilustración');
        }
      });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta ilustración?')) return;
   
    this.http.delete(`http://localhost:3001/api/proyecto5/react/${id}`)
      .subscribe({
        next: () => {
          this.cargarIlustraciones();
        },
        error: () => alert('Error al eliminar')
      });
  }
}