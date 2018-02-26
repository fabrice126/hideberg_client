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
        return (
            <div className="div-home-HBmapcountry">
                <span id="span_country" className="aside_title">{this.props.elements.country}</span>
                <img id="img_country" src="/images/map/continents/europe/countries/countries_france.png" alt="france" />
            </div>
        )
    }
}
export default HBmapcountry;