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
    // Coordenadas do Bloco A
    const latA = 41.268376828456574;
    const lngA = -8.616794140859664;
    
    // As coordenadas exatas que indicaste para o Edifício Desportivo
    const latD = 41.27069374015711;
    const lngD = -8.616562487138975;

    const centroLat = (latA + latD) / 2;
    const centroLng = (lngA + lngD) / 2;

    this.mapa = L.map('mapaDefinitivo').setView([centroLat, centroLng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.mapa);

    // Configuração para o texto aparecer exatamente por cima (offset)
    const popupOptions = { 
      autoClose: false, 
      closeOnClick: false,
      offset: L.point(0, -32) // Empurra o balão para cima do ícone
    };

    // Marcador Bloco A - Piso 3
    L.marker([latA, lngA]).addTo(this.mapa)
      .bindPopup('<b>Bloco A - Piso 3</b>', popupOptions)
      .openPopup();

    // Marcador Edifício Desportivo - Piso 0 (No centro do seu "Mark")
    L.marker([latD, lngD]).addTo(this.mapa)
      .bindPopup('<b>Edifício Desportivo - Piso 0</b>', popupOptions)
      .openPopup();

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 1000);
  }
}