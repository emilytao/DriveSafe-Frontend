import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import Table from "../Table";

class CompareIntersections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: false,
      options: [],
      intersection1: "",
      intersection2: "",
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

  componentDidMount = () => {
    axios
      .get("https://cs348-278621.ue.r.appspot.com/intersections")
      .then((res) => {
        let data = res.data;
        this.setState({
          options: data.map((i) => i.name),
        });
      });
  };

  handleSelect1 = (event) => {
    this.setState({
      intersection1: event.value,
    });
  };

  handleSelect2 = (event) => {
    this.setState({
      intersection2: event.value,
    });
  };

  handleSubmit = () => {
    axios
      .get(
        "https://cs348-278621.ue.r.appspot.com/compareIntersections/" +
          this.state.intersection1 +
          "/" +
          this.state.intersection2
      )
      .then((res) => {
        console.log(res);
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
        <div className="query__title">Compare Intersections</div>
        <div className="query__description">
          Choose two intersections from the dropdowns below to compare their
          collision data.
        </div>
        <Dropdown
          className="query__dropdown"
          options={this.state.options}
          onChange={this.handleSelect1}
          value={this.state.intersection1}
        />
        <Dropdown
          className="query__dropdown"
          options={this.state.options}
          onChange={this.handleSelect2}
          value={this.state.intersection2}
        />
        <button className="query__button" onClick={this.handleSubmit}>
          Submit{" "}
        </button>
        {this.state.showTable && (
          <Table columns={this.state.columns} data={this.state.data} />
        )}
      </React.Fragment>
    );
  }
}

export default CompareIntersections;
