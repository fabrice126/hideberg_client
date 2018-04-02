import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HBcomeback from '../../components/HBcomeback/HBcomeback';
import './HBfooter.css';

class HBfooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements
        }
    }

    render() {
        return (
            <div className="div-home-HBfooter">
                {/* <HBcomeback _to="/continent/europe" /> */}
                {/* <Link to='#' id="sp_adv">Advertising : Indeed 1st Joabboard in the world</Link> */}
                <div className="div_footer">
                    <span id="sp_copyright">COPYRIGHT © 2018 Hideberg.</span>
                    <nav>
                        <Link to='#'>À propos</Link>
                        <Link to='#'>Engagement de confidentialité</Link>
                        <Link to='#'>Utilisation des cookies</Link>
                        <Link to='#'>Conditions d'utilisation</Link>
                        <Link to='#'>Mentions légales</Link>
                        {/* <Link to='#'>Nous rejoindre</Link> */}
                    </nav>
                </div>
            </div>
        )
    }
}
export default HBfooter;