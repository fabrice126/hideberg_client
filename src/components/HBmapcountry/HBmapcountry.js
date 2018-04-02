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
        let _urlCountry="/images/map/continents/europe/countries/countries_"+this.state.elements.country+".png";
        return (
            <div className="div-home-HBmapcountry">
                <span id="span_country" className="aside_title">{this.props.elements.country}</span>
                <img id="img_country" src={_urlCountry} alt={this.state.elements.country} />
            </div>
        )
    }
}
export default HBmapcountry;