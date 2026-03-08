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
    // Coordenadas precisas para o Bloco A
    const latA = 41.268150; 
    const lngA = -8.616794;
    
    // As tuas coordenadas exatas para o Edifício Desportivo
    const latD = 41.27069374015711;
    const lngD = -8.616562487138975;

    const centroLat = (latA + latD) / 2;
    const centroLng = (lngA + lngD) / 2;

    this.mapa = L.map('mapaDefinitivo').setView([centroLat, centroLng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.mapa);

    // Ajuste milimétrico para o balão ficar em cima do "Mark"
    const popupOptions = { 
      autoClose: false, 
      closeOnClick: false,
      offset: L.point(0, -10) // Ajuste para o bico do balão tocar no ícone
    };

    // Marcador Bloco A - Piso 3
    L.marker([latA, lngA]).addTo(this.mapa)
      .bindPopup('<b>Bloco A - Piso 3</b>', popupOptions)
      .openPopup();

    // Marcador Edifício Desportivo - Piso 0
    L.marker([latD, lngD]).addTo(this.mapa)
      .bindPopup('<b>Edifício Desportivo - Piso 0</b>', popupOptions)
      .openPopup();

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 1000);
  }
}