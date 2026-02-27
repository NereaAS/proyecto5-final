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
    this.http.get('http://localhost:3001/api/proyecto5/angular')
      .subscribe((data: any) => {
        this.avatar = data.find((item: any) => item.titulo === 'Avatar Nerea');
        console.log('Avatar encontrado:', this.avatar)
      });
  }
}

