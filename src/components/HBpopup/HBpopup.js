import React, { Component } from 'react';
import './HBpopup.css';

class HBpopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.img || "/images/icons/soon_icons.svg",
            msg: this.props.msg || ""
        }
    }

    render() {
        return (
            <div ref="hbPopup" className="div-home-HBpopup">
                <div className="div_shadow"></div>
                <div className="div_popup">
                    <img src={this.state.img} alt={this.state.msg} />
                    <span className="span_main">{this.state.msg}</span>
                </div>
            </div>
        )
    }
}
export default HBpopup;