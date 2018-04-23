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
                    <Link to='/'><img id="img_logo" src="/images/_logo.svg" alt="logo" /></Link>
                    <div className='div_icons_header'>
                        <Link to='/' title="Recherche"><i className="flaticon-geography"></i></Link>
                        <Link to='/blog' title="Blog"><i className="flaticon-paper"></i></Link>
                        {/* <Link to='/' title="Favoris"><i className="material-icons">favorite</i></Link> */}
                        <Link to='/login' title="Connexion"><i className="flaticon-profile"></i> <span>LOGIN</span></Link>
                        {/* <img id="img_login" src="/images/icons/login.png" alt="login" /> */}
                    </div>
                </header>
            </div>
        )
    }
}
export default HBheader;