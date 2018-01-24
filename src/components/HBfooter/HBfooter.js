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
                    <a href="/" id="a_back">
                        <i className="fa fa-chevron-left"></i> come back</a>
                    <span id="sp_adv">Advertising : Indeed 1st Joabboard in the world</span>
                    <nav>
                    <Link to='#'>Abouts us</Link>
                    <Link to='#'>Engagement de confidentialité</Link>
                    <Link to='#'>Utilisation des cookies</Link>
                    <Link to='#'>Conditions d'utilisation</Link>
                    <Link to='#'>Mentions légales</Link>
                    <Link to='#'>Carreer</Link>
                    {
                        // <a href="#">Abouts us</a>
                        // <a href="#">Engagement de confidentialité</a>
                        // <a href="#">Utilisation des cookies</a>
                        // <a href="#">Conditions d'utilisation</a>
                        // <a href="#">Mentions légales</a>
                        // <a href="#">Carreer</a>
                    }
                    </nav>
                    <span id="sp_copyright">COPYRIGHT © 2016 Intwork Inc.</span>
                </footer>
            </div>
        )
    }
}
export default HBfooter;