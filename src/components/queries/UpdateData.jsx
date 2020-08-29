import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';

import Table from "../Table";

class UpdateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTable: false,
            query: "",
            numCollisions: "",
            options: [],
            intersection: "",
            columns: [
                {
                    Header: "Current Data",
                    columns: [
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Latitude",
                            accessor: "latitude"
                        },
                        {
                            Header: "Longitude",
                            accessor: "longitude"
                        },
                        {
                            Header: "Number of Collisions",
                            accessor: "num_collisions"
                        }
                    ]
                }
            ],
            data: []
        };
    }

    componentDidMount = () => {
        axios.get("https://cs348-278621.ue.r.appspot.com/intersections")
            .then(res => {
                let data = res.data;
                this.setState({
                    options: data.map(i => i.name)
                })
            })
    }

    handleSelect = event => {
        this.setState({
            intersection: event.value
        })
    }

    handleChange = event => {
        this.setState({
            numCollisions: event.target.value
        });
    }

    handleSelectIntersection = () => {
        axios.get("https://cs348-278621.ue.r.appspot.com/intersection/" + this.state.intersection)
            .then(res => {
                console.log(res);
                this.setState({
                    showTable: true,
                    data: res.data
                })
            })
    }

    handleUpdateIntersection = () => {
        axios.post("https://cs348-278621.ue.r.appspot.com/updateCollisions/" + this.state.intersection + "/" + this.state.numCollisions)
    }

    render() {
        return (
            <React.Fragment>
                <div className="query__title">Update Intersection Data</div>
                <div className="query__description">Choose an intersection to update their collision data.</div>
                <Dropdown className="query__dropdown" options={this.state.options} onChange={this.handleSelect} value={this.state.intersection} />
                <button className="query__button" onClick={this.handleSelectIntersection}>Submit </button>
                {this.state.showTable && <Table columns={this.state.columns} data={this.state.data} />}
                {this.state.showTable &&
                    <div className="query__update">
                        <div className="query__description">The only modifiable field is: num_collisions. Please enter a new value. </div>
                        <input type="number" className="query__input" min="0" onChange={this.handleChange} />
                        <button className="query__button" onClick={this.handleUpdateIntersection}>Update</button>
                    </div>}

            </React.Fragment>
        )
    }
}

export default UpdateData;