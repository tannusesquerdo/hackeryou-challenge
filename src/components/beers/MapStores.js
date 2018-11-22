import React, { Component } from 'reactn';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {}
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          position: position.coords
        })
      })
    }
  }

  render() {
    const { position } = this.state;

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 43.7001100, lng: -79.4163000 } }
        defaultZoom = { 5 }
      >
      {props.isMarkerShown && props.markers.map(marker => (
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          key={marker.id}
        />
      ))}
      </GoogleMap>
    ));

    return(
      <React.Fragment>
        <GoogleMapExample
          isMarkerShown
          markers={this.props.stores}
          containerElement={<div style={{ height: `500px`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </React.Fragment>
    );
  }
};
export default Map;