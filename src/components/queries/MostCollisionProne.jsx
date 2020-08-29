import React, { Component } from "react";
import axios from "axios";

import Table from "../Table";

class MostCollisionProne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numIntersections: "10",
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
              Header: "Danger Ratio",
              accessor: "danger_ratio",
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
      numIntersections: event.target.value === "" ? "10" : event.target.value,
    });
  };

  handleSubmit = () => {
    axios
      .get(
        "https://cs348-278621.ue.r.appspot.com/collisions/" +
          this.state.numIntersections
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
        <div className="query__title">Collision-Prone Intersections</div>
        <div className="query__description">
          Enter the number of most collision-prone intersections you'd like to
          see. If no number is inputted, then the 10 most collision prone
          intersections will be displayed.
        </div>
        <input
          type="number"
          className="query__input"
          min="0"
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

export default MostCollisionProne;
