import React, { Component } from 'react';
import './HBmapcountry.css';

class HBmapcountry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements
        }
    }

    render() {
        //console.log(this.state.elements);
        return (
            <div className="div-app-HBmapcountry">
              <span id="span_country" className="aside_title">{this.props.elements.country}</span>
              <img id="img_country" src="./images/map/continents/europe/countries/countries_france.png" />
            </div>
        )
    }
}
export default HBmapcountry;