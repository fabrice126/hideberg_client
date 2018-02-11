import React, { Component } from 'react';
import './HBpopup.css';

class HBpopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: this.props.msg || ""
        }
    }

    render() {
        return (
            <div ref="hbPopup" className="div-home-HBpopup">
                <div className="div_shadow"></div>
                <div className="div_popup">
                    <button className="bt_close">X</button>
                    <img src="/images/icons/soon_icons.png" alt="{this.props.msg}" />
                    <span className="span_main">{this.props.msg}</span>
                </div>
            </div>
        )
    }
}
export default HBpopup;