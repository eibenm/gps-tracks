import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import * as Constants from '../constants';

mapboxgl.accessToken = Constants.MAPBOX_ACCESS_TOKEN;

class Map extends Component {

  map;
  
  constructor(props) {
    super(props);
    this.state = {
      lat: Constants.MAPBOX_INIT_LAT,
      lng: Constants.MAPBOX_INIT_LNG,
      zoom: 12
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.map,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: new mapboxgl.LngLat(lng, lat),
      zoom: zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', function() {
      console.log('map is loaded');
    });
  }

  render() {
    return(
      <div>
        <div ref={ref => this.map = ref} id="map"></div>
      </div>
    );
  }
}

export default Map;