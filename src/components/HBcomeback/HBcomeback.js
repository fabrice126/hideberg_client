import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HBcomeback.css';

class HBcomeback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _to:this.props._to
        }
    }

    render() {
        return (
            <div className="div-home-HBcomeback">
                <Link to={this.state._to} id="link_back"><i className="fa fa-chevron-left"></i> retour</Link>
            </div>
        )
    }
}
export default HBcomeback;