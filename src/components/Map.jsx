import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import axios from "axios";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedIntersections: props.displayedIntersections,
      intersections: [],
      activeMarker: {},
      selectedIntersection: {},
      showingInfoWindow: false,
    };
  }

  capitalizeWords = (str) => {
    if (!str) return "";
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  componentDidMount = () => {
    axios
      .get("https://cs348-278621.ue.r.appspot.com/intersections")
      .then((res) => {
        let data = res.data;
        this.setState({
          intersections: data.map((i) => {
            return {
              name: i.name,
              numCollisions: i.num_collisions,
              dailyTraffic: i.north + i.south + i.east + i.west,
              latitude: i.latitude,
              longitude: i.longitude,
            };
          }),
        });
      });
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      selectedIntersection: props,
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={15}
        className="map"
        initialCenter={{
          lat: 49.282872,
          lng: -123.127577,
        }}
      >
        {this.state.intersections.map((i) => {
          let markerIcon = {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          };
          if (
            this.props.display &&
            this.props.display.find((j) => j.name === i.name)
          ) {
            markerIcon = {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            };
          }
          return (
            <Marker
              onClick={this.onMarkerClick}
              key={i.name}
              name={i.name}
              numCollisions={i.numCollisions}
              dailyTraffic={i.dailyTraffic}
              position={{ lat: i.latitude, lng: i.longitude }}
              icon={markerIcon}
              dangerRatio={(i.numCollisions / i.dailyTraffic).toFixed(3)}
            />
          );
        })}
        <InfoWindow
          onClose={this.onInfoWindowClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <ul className="infoWindow_list">
              <li className="infoWindow_list_Title">
                {this.capitalizeWords(this.state.selectedIntersection.name)}
              </li>
              <li>
                Recorded Collisions:{" "}
                {this.state.selectedIntersection.numCollisions}
              </li>
              <li>
                Daily Traffic Volume:{" "}
                {this.state.selectedIntersection.dailyTraffic}
              </li>
              <li>
                Hazard Score: {this.state.selectedIntersection.dangerRatio}
              </li>
            </ul>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCa4acJqEz07SIqg2E5HTWR2cWEG7Kly5Y",
})(MapContainer);
