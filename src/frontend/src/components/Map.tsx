import * as React from 'react';
import * as turf from '@turf/turf';
const mapboxgl = require('mapbox-gl');
// import * as mapboxgl from 'mapbox-gl';

import { Track } from '@src/store/gpx/types';
import { Constants } from '@src/constants';

import '@src/components/Map.css';

interface Props {
  tracks: Array<Track>;
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
  public isLoaded: boolean;

  public mapSources: Array<string>;
  public mapLayers: Array<string>;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      lat: Constants.MAPBOX_INIT_LAT,
      lng: Constants.MAPBOX_INIT_LNG,
      zoom: 12
    };
    this.isLoaded = false;
  }

  public componentDidMount(): void {

    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/outdoors-v10',
      style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g',
      center: new mapboxgl.LngLat(lng, lat),
      zoom: zoom
    } as mapboxgl.MapboxOptions);

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {

      this.map.addSource('dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb'
      });

      this.map.addLayer({
          id: 'hillshading',
          source: 'dem',
          type: 'hillshade'
      // insert below waterway-river-canal-shadow;
      // where hillshading sits in the Mapbox Outdoors style
      }, 'waterway-river-canal-shadow');

      this.isLoaded = true;
      this.checkRenderTracks();
    });

    this.mapSources = [];
    this.mapLayers = [];
  }
  
  public componentDidUpdate(): void {
    this.checkRenderTracks();
  }

  public checkRenderTracks(): void {
    const { tracks } = this.props;
    if (tracks && tracks.length !== 0 && this.isLoaded === true) {
      this.renderTracks(tracks);
    }
  }

  public renderTracks(tracks: Array<Track>): void {
    if (tracks.length > 0) {
      this.removeMapLayers();
      let bounds = new mapboxgl.LngLatBounds(null, null);
      for (let i = 0; i < tracks.length; i++) {
        const record = tracks[i];
        const feature = JSON.parse(record.geojson);
        const sourceString = `track-source-${record.id}`;
        const layerString = `track-layer-${record.id}`;
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

  public removeMapLayers() {
    this.removeLayers();
    this.removeSources();
  }

  public render(): JSX.Element {
    return(
      <div>
        <div ref={ref => this.mapContainer = ref} id="map" />
      </div>
    );
  }

  // Private

  private removeSources() {
    if (this.mapSources.length > 0) {
      this.mapSources.forEach(source => this.map.removeSource(source));
      this.mapSources = [];
    }
  }

  private removeLayers() {
    if (this.mapLayers.length > 0) {
      this.mapLayers.forEach(layer => this.map.removeLayer(layer));
      this.mapLayers = [];
    }
  }
}

export default Map;