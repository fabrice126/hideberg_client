import React, { Component } from 'react';
import './HBheader.css';

class HBheader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        //console.log(this.state.elements);
        return (
            <div className="div-app-HBheader">
                <header>
                    <a href="/"><img id="img_logo" src="/images/_logo.png" /></a>
                    <a href="/?login=true"><img id="img_login" src="/images/icons/login.png" /></a>
                </header>
            </div>
        )
    }
}
export default HBheader;