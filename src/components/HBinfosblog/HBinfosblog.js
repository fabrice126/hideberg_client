import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './HBinfosblog.css';

class HBinfosblog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements
        }
    }

    render() {
        let links = this.state.elements;
        let tabLinks = [];
        for (let key in links) {
            if (links.hasOwnProperty(key)) {
                //console.log(key + " -> " + links[key]);
                tabLinks.push(
                    <Link to='/#' target="_blank" key={"a_" + key}>
                        <img src={"images/icons/" + links[key] + ".png"} alt={"a_" + key} />
                        <span>{links[key]}</span>
                    </Link>
                    // {<a href="#" target="_blank" key={"a_"+key}><img src={"images/icons/" + links[key] + ".png"} />{links[key]}</a>}
                );
            }
        }
        return (
            <div className="div-home-HBinfosblog">
                <span className="aside_title">{this.props.name}</span>
                <nav id="nav_linkcountry">{tabLinks}</nav>
            </div>
        )
    }
}
export default HBinfosblog;