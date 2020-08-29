import React, { Component } from 'react';
import icon from "../assets/accident.jpg";

class Home extends Component {

    render() {
        return (
            <div className="home">
                <div className="home__container">
                    <div className="home__title">DriveSafe</div>
                    <div className="home__description">
                        DriveSafe is a <b>database-reliant</b> platform that promotes <b>road safety</b>, starting with the Vancouver area.
                        <br />
                        <br />
                        It provides a platform for drivers to search <b>collision reports</b> by intersection and encourage the <b>self-reporting</b> of collisions.
                        We are also developing a <b>mobile app</b> that provides <b> real-time warnings</b> for drivers as they approach collision-prone intersections.
                    </div>
                    <button onClick={this.props.function} className="home__button">Get Started</button>
                    <img src={icon} alt="icon" className="home__icon" />
                </div>
            </div >
        )
    }
}

export default Home;