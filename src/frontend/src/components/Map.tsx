import * as React from 'react';
import * as turf from '@turf/turf';
const mapboxgl = require('mapbox-gl');
// import * as mapboxgl from 'mapbox-gl';

import { Constants } from '../constants/index';

export interface Record {
  id: number;
  name: string;
  geojson: string;
}

interface Props {
  records: Array<Record>;
  getGpx: () => void;
}

interface State {
  lat: number;
  lng: number;
  zoom: number;
}

mapboxgl.accessToken = Constants.MAPBOX_ACCESS_TOKEN;

class Map extends React.Component<Props, State> {

  public mapContainer: HTMLDivElement | null;
  public map: mapboxgl.Map;

  public mapSources: Array<string>;
  public mapLayers: Array<string>;
  
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
    const { getGpx } = this.props;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: new mapboxgl.LngLat(lng, lat),
      zoom: zoom
    } as mapboxgl.MapboxOptions);

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => getGpx());

    this.mapSources = [];
    this.mapLayers = [];
  }
  
  public componentDidUpdate(): void {
    const { records } = this.props;
    if (records && records.length !== 0) {
      this.renderTracks(records);
    }
  }

  public renderTracks(records: Array<Record>): void {
    if (records.length > 0) {
      this.removeSources();
      this.removeLayers();
      let bounds = new mapboxgl.LngLatBounds(null, null);
      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const feature = JSON.parse(record.geojson);
        const sourceString = `track-source-${record.id}`;
        const layerString = `track-lauyer-${record.id}`;
        this.mapSources.push(sourceString);
        this.mapLayers.push(layerString);
        this.map.addSource(sourceString, {
          type: 'geojson',
          'data': feature as GeoJSON.Feature<mapboxgl.GeoJSONGeometry>
        });
        this.map.addLayer({
          'id': layerString,
          'type': 'line',
          'source': sourceString,
          'layout': {
              'line-join': 'round',
              'line-cap': 'round'
          },
          'paint': {
              'line-color': '#888',
              'line-width': 8
          }
        });
        const bbox = turf.bbox(feature as turf.helpers.Feature);
        const minX = bbox[0],
          minY = bbox[1],
          maxX = bbox[2],
          maxY = bbox[3];
        const sw = new mapboxgl.LngLat(minX, minY);
        const ne = new mapboxgl.LngLat(maxX, maxY);
        bounds.extend(new mapboxgl.LngLatBounds(sw, ne));
      }
      this.map.fitBounds(bounds);
    }
  }

  public removeSources() {
    if (this.mapSources.length > 0) {
      this.mapSources.forEach(source => this.map.removeSource(source));
      this.mapSources = [];
    }
  }

  public removeLayers() {
    if (this.mapLayers.length > 0) {
      this.mapLayers.forEach(layer => this.map.removeLayer(layer));
      this.mapLayers = [];
    }
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