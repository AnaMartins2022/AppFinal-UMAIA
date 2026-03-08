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
    // Coordenadas exatas do Bloco A
    const latA = 41.268150; 
    const lngA = -8.616794;
    
    // As tuas coordenadas exatas do Edifício Desportivo
    const latD = 41.27069374015711;
    const lngD = -8.616562487138975;

    const centroLat = (latA + latD) / 2;
    const centroLng = (lngA + lngD) / 2;

    this.mapa = L.map('mapaDefinitivo').setView([centroLat, centroLng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.mapa);

    // Opções para o balão ficar colado ao bico do marcador
    const popupOptions = { 
      offset: L.point(0, -15) 
    };

    // Marcador Bloco A - O popup NÃO abre sozinho agora
    L.marker([latA, lngA]).addTo(this.mapa)
      .bindPopup('<b>Bloco A - Piso 3</b>', popupOptions);

    // Marcador Edifício Desportivo - O popup NÃO abre sozinho agora
    L.marker([latD, lngD]).addTo(this.mapa)
      .bindPopup('<b>Edifício Desportivo - Piso 0</b>', popupOptions);

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 1000);
  }
}