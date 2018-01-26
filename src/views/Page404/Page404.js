import React, { Component } from 'react';
import './Page404.css';
import HBerror from '../../components/HBerror/HBerror';

export default class Page404 extends Component {
    render() {
        return (
            <div className="div-home-Page404">
                <HBerror errMsg={this.props.location.errMsg || "404 not found"} />
            </div>
        );
    }
}
