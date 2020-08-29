import React, { Component } from "react";
import axios from "axios";

import Table from "../Table";

class IntersectionRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minLatitude: "",
      maxLatitude: "",
      minLongitude: "",
      maxLongitude: "",
      showTable: false,
      columns: [
        {
          Header: "Intersection Data",
          columns: [
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Latitude",
              accessor: "latitude",
            },
            {
              Header: "Longitude",
              accessor: "longitude",
            },
            {
              Header: "Number of Collision",
              accessor: "num_collisions",
            },
            {
              Header: "Total Traffic",
              accessor: "total_traffic",
            },
          ],
        },
      ],
      data: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    axios
      .get(
        "https://cs348-278621.ue.r.appspot.com/intersectionsWithinRange/" +
          this.state.minLatitude +
          "/" +
          this.state.maxLatitude +
          "/" +
          this.state.minLongitude +
          "/" +
          this.state.maxLongitude
      )
      .then((res) => {
        this.props.update(res.data);
        this.setState({
          showTable: true,
          data: res.data,
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="query__title">Street Region</div>
        <div className="query__description">
          Enter range of latitudes and longitudes to see the intersections
          collision data within that region.
        </div>
        <input
          placeholder="Min Latitude"
          type="text"
          className="query__input"
          name="minLatitude"
          onChange={this.handleChange}
        />
        <input
          placeholder="Max Latitude"
          type="text"
          className="query__input"
          name="maxLatitude"
          onChange={this.handleChange}
        />
        <input
          placeholder="Min Longitude"
          type="text"
          className="query__input"
          name="minLongitude"
          onChange={this.handleChange}
        />
        <input
          placeholder="Max Longitude"
          type="text"
          className="query__input"
          name="maxLongitude"
          onChange={this.handleChange}
        />
        <button className="query__button" onClick={this.handleSubmit}>
          Submit
        </button>
        {this.state.showTable && (
          <Table columns={this.state.columns} data={this.state.data} />
        )}
      </React.Fragment>
    );
  }
}

export default IntersectionRegion;
