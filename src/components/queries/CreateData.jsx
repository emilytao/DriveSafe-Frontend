import React, { Component } from 'react';
import 'react-dropdown/style.css';
import axios from 'axios';

class CreateData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            latitude: "",
            longitude: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        axios.post("https://cs348-278621.ue.r.appspot.com/addNewIntersection/" + this.state.name + "/" + this.state.latitude + "/" + this.state.longitude)
    }

    render() {
        return (
            <React.Fragment>
                <div className="query__title">Create an Intersection</div>
                <div className="query__description">Enter an intersection's information to add it to the database.</div>
                <input placeholder="Name" type="text" className="query__input" name="name" onChange={this.handleChange} />
                <input placeholder="Latitude" type="text" className="query__input" name="latitude" onChange={this.handleChange} />
                <input placeholder="Longitude" type="text" className="query__input" name="longitude" onChange={this.handleChange} />
                <button className="query__button" onClick={this.handleSubmit}>Submit </button>
            </React.Fragment>
        )
    }
}

export default CreateData;