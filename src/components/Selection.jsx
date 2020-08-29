import React, { Component } from "react";
import Map from "./Map";
import MostCollisionProne from "./queries/MostCollisionProne";
import CompareIntersections from "./queries/CompareIntersections";
import UpdateData from "./queries/UpdateData";
import CreateData from "./queries/CreateData";
import StreetIntersections from "./queries/StreetIntersections";
import IntersectionRegion from "./queries/IntersectionRegion";

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedIntersections: [],
      showView: true,
      showCompare: false,
      showUpdate: false,
      showCreate: false,
      showStreet: false,
      showRegion: false,
    };
  }

  updateDisplayedIntersections = (newDisplayedIntersections) => {
    this.setState({
      displayedIntersections: newDisplayedIntersections,
    });
  };

  onViewClick = () => {
    this.setState({
      showView: true,
      showCompare: false,
      showUpdate: false,
      showCreate: false,
      showStreet: false,
      showRegion: false,
    });
  };

  onCompareClick = () => {
    this.setState({
      showView: false,
      showCompare: true,
      showUpdate: false,
      showCreate: false,
      showStreet: false,
      showRegion: false,
    });
  };

  onUpdateClick = () => {
    this.setState({
      showView: false,
      showCompare: false,
      showUpdate: true,
      showCreate: false,
      showStreet: false,
      showRegion: false,
    });
  };

  onCreateClick = () => {
    this.setState({
      showView: false,
      showCompare: false,
      showUpdate: false,
      showCreate: true,
      showStreet: false,
      showRegion: false,
    });
  };

  onStreetClick = () => {
    this.setState({
      showView: false,
      showCompare: false,
      showUpdate: false,
      showCreate: false,
      showStreet: true,
      showRegion: false,
    });
  };

  onRegionClick = () => {
    this.setState({
      showView: false,
      showCompare: false,
      showUpdate: false,
      showCreate: false,
      showStreet: false,
      showRegion: true,
    });
  };

  render() {
    return (
      <div className="selection">
        <div className="selection__container">
          <div className="selection__tab">
            <button
              className={
                this.state.showView
                  ? "selection__button-active"
                  : "selection__button"
              }
              onClick={this.onViewClick}
            >
              View
            </button>
            <button
              className={
                this.state.showCompare
                  ? "selection__button-active"
                  : "selection__button"
              }
              onClick={this.onCompareClick}
            >
              Compare
            </button>
            <button
              className={
                this.state.showUpdate
                  ? "selection__button-active"
                  : "selection__button"
              }
              onClick={this.onUpdateClick}
            >
              Update
            </button>
            <button
              className={
                this.state.showCreate
                  ? "selection__button-active"
                  : "selection__button"
              }
              onClick={this.onCreateClick}
            >
              Create
            </button>
            <button
              className={
                this.state.showStreet
                  ? "selection__button-active"
                  : "selection__button"
              }
              onClick={this.onStreetClick}
            >
              Street
            </button>
            <button
              className={
                this.state.showRegion
                  ? "selection__button-active"
                  : "selection__button"
              }
              onClick={this.onRegionClick}
            >
              Region
            </button>
          </div>
          <div className="selection__query">
            {this.state.showView && (
              <MostCollisionProne update={this.updateDisplayedIntersections} />
            )}
            {this.state.showCompare && (
              <CompareIntersections
                update={this.updateDisplayedIntersections}
              />
            )}
            {this.state.showUpdate && <UpdateData />}
            {this.state.showCreate && <CreateData />}
            {this.state.showStreet && (
              <StreetIntersections update={this.updateDisplayedIntersections} />
            )}
            {this.state.showRegion && (
              <IntersectionRegion update={this.updateDisplayedIntersections} />
            )}
          </div>
        </div>
        {/* <div className="selection__container">
                    
                </div> */}
        <div className="selection__map">
          <Map display={this.state.displayedIntersections} />
        </div>
      </div>
    );
  }
}

export default Selection;
