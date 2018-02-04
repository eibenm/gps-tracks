import * as React from 'react';
const mapboxgl = require('mapbox-gl');

import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_INIT_LAT,
  MAPBOX_INIT_LNG
} from '../constants/index';

interface MapState {
  lat: number;
  lng: number;
  zoom: number;
}

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

class Map extends React.Component<{}, MapState> {

  private mapContainer: HTMLDivElement;
  private map: mapboxgl.Map;
  
  constructor(props: {}) {
    super(props);
    this.state = {
      lat: MAPBOX_INIT_LAT,
      lng: MAPBOX_INIT_LNG,
      zoom: 12
    };
  }

  componentDidMount(): void {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: new mapboxgl.LngLat(lng, lat),
      zoom: zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', function() {
      window.console.log('map is loaded');
    });
  }

  render(): JSX.Element {
    return(
      <div>
        <div ref={ref => this.mapContainer = ref as HTMLDivElement} id="map" />
      </div>
    );
  }
}

export default Map;