import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HBfooter.css';

class HBfooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.props.elements
        }
    }

    render() {
        //console.log(this.state.elements);
        return (
            <div className="div-home-HBfooter">
                <footer>
                    {/* <Link to='#' id="sp_adv">Advertising : Indeed 1st Joabboard in the world</Link> */}
                    <nav>
                        <span id="sp_copyright">COPYRIGHT © 2018 Hideberg.</span>
                        <Link to='#'>À propos</Link>
                        <Link to='#'>Engagement de confidentialité</Link>
                        <Link to='#'>Utilisation des cookies</Link>
                        <Link to='#'>Conditions d'utilisation</Link>
                        <Link to='#'>Mentions légales</Link>
                        {/* <Link to='#'>Nous rejoindre</Link> */}
                    </nav>
                </footer>
            </div>
        )
    }
}
export default HBfooter;