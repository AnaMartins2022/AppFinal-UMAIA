import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  mapa!: L.Map;

  ngOnInit() {
    // Coordenadas exatas que definimos
    const latA = 41.268150; 
    const lngA = -8.616794;
    const latD = 41.27069374015711;
    const lngD = -8.616562487138975;

    // Calcula o ponto médio entre os dois edifícios
    const centroLat = (latA + latD) / 2;
    const centroLng = (lngA + lngD) / 2;

    // AJUSTE: Coloquei o zoom em 16 para caberem os dois no ecrã
    this.mapa = L.map('mapaDefinitivo').setView([centroLat, centroLng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.mapa);

    const popupOptions = { offset: L.point(0, -12) };

    // Marcadores (fechados no início, abrem ao clicar no "Mark")
    L.marker([latA, lngA]).addTo(this.mapa)
      .bindPopup('<b>Bloco A - Piso 3</b>', popupOptions);

    L.marker([latD, lngD]).addTo(this.mapa)
      .bindPopup('<b>Edifício Desportivo - Piso 0</b>', popupOptions);

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 1000);
  }
}