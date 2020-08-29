import React, { Component } from "react";
import axios from "axios";

import Table from "../Table";

class StreetIntersections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: false,
      streetName: "",
      options: [],
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
              Header: "Number of Collisions",
              accessor: "num_collisions",
            },
          ],
        },
      ],
      data: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      streetName: event.target.value,
    });
  };

  handleSubmit = () => {
    axios
      .get(
        "https://cs348-278621.ue.r.appspot.com/intersectionsWithStreet/" +
          this.state.streetName
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
        <div className="query__title">Street Intersections</div>
        <div className="query__description">
          Choose a street name to view all the intersection collision data along
          its length.
        </div>
        <input
          placeholder="Street name"
          type="text"
          className="query__input"
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

export default StreetIntersections;
