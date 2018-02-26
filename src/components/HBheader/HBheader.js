import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HBheader.css';

class HBheader extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="div-home-HBheader">
                <header>
                    <Link to='/'>
                        <img id="img_logo" src="/images/_logo.png" alt="logo" />
                    </Link>
                    <Link to='/login'>
                        <img id="img_login" src="/images/icons/login.png" alt="login" />
                    </Link>
                </header>
            </div>
        )
    }
}
export default HBheader;