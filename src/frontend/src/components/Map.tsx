import * as React from 'react';
const mapboxgl = require('mapbox-gl');

import { Constants } from '../constants/index';

interface Props { }

interface State {
  lat: number;
  lng: number;
  zoom: number;
}

mapboxgl.accessToken = Constants.MAPBOX_ACCESS_TOKEN;

class Map extends React.Component<Props, State> {

  private mapContainer: HTMLDivElement | null;
  private map: mapboxgl.Map;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      lat: Constants.MAPBOX_INIT_LAT,
      lng: Constants.MAPBOX_INIT_LNG,
      zoom: 12
    };
  }

  public componentDidMount(): void {
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

  public render(): JSX.Element {
    return(
      <div>
        <div ref={ref => this.mapContainer = ref} id="map" />
      </div>
    );
  }
}

export default Map;