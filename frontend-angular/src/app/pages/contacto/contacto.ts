import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto implements OnInit {
  avatar: any = null;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarAvatar();
  }

  cargarAvatar() {
    this.http.get('http://localhost:3001/uploads/avatar-nerea.jpg', { responseType: 'blob' })
      .subscribe({
        next: (imageBlob) => {
          const imageUrl = URL.createObjectURL(imageBlob);
          this.avatar = { imagen: imageUrl };
          console.log('http://localhost:3001/uploads/avatar-nerea.jpg:', imageUrl);
        },
        error: () => {
          console.log('No se pudo cargar la imagen de avatar');
          this.avatar = null;
        }
      });
  }
}
