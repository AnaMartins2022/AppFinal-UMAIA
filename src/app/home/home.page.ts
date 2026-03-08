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
    // Coordenadas do Bloco A (Mantidas)
    const latA = 41.268376828456574;
    const lngA = -8.616794140859664;
    
    // NOVA Coordenada corrigida para o Bloco D
    const latD = 41.270574257818744;
    const lngD = -8.616579564216323;

    // Centro do mapa entre os dois pontos
    const centroLat = (latA + latD) / 2;
    const centroLng = (lngA + lngD) / 2;

    this.mapa = L.map('mapaDefinitivo').setView([centroLat, centroLng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.mapa);

    // Marcador Bloco A - Piso 3
    L.marker([latA, lngA]).addTo(this.mapa)
      .bindPopup('<b>Bloco A - Piso 3</b>', { autoClose: false, closeOnClick: false })
      .openPopup();

    // Marcador Edifício Desportivo - Piso 0 (COM A NOVA COORDENADA)
    L.marker([latD, lngD]).addTo(this.mapa)
      .bindPopup('<b>Edifício Desportivo - Piso 0</b>', { autoClose: false, closeOnClick: false })
      .openPopup();

    // Correção para janelas maximizadas
    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 1000);
  }
}