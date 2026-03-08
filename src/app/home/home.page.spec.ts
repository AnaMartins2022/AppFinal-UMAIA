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
  map!: L.Map;

  ngOnInit() {
    // Coordenadas Exatas da UMAIA: [41.23122, -8.62837]
    // Zoom aumentado para 18 para veres bem os edifícios
    this.map = L.map('mapId').setView([41.23122, -8.62837], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Marcador colocado exatamente sobre o campus
    L.marker([41.23122, -8.62837]).addTo(this.map)
      .bindPopup('<b>Campus UMAIA</b><br>Edifício A e D prontos.')
      .openPopup();

    // Este truque força o mapa a carregar os quadrados que faltam
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }
}