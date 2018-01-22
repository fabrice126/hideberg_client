import React, { Component } from 'react';
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
                tabLinks.push(<a href="#" target="_blank" key={"a_"+key}><img src={"images/icons/" + links[key] + ".png"} /><span>{links[key]}</span></a>);
            }
        }
        return (
            <div className="div-app-HBinfosblog">
                <span className="aside_title">{this.props.name}</span>
                <nav id="nav_linkcountry">{tabLinks}</nav>
            </div>
        )
    }
}
export default HBinfosblog;