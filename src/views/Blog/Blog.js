import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import './Blog.css';

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.tcountries = ["espagne", "italie", "royaume-uni", "pays-bas", "france", "allemagne", "suisse", "grece", "irlande"];
        this.state = {
            wellSubscribe: false,
        }
    }

    componentDidMount = () => {

    }

    render() {
        console.log("countries", this.countries);
        return (
            <div className="div-home-HBblog">
                <header><span>EUROPE</span></header>
                <ul className="ul_countries">
                    {
                        this.tcountries.map(
                            (country, i) => <li key={i} className={"li_"+country}><span><Link key={'link'+i} to={'/blog/europe/'+country}>{country}</Link></span></li>
                        )
                    }
                </ul>
            </div>
        )
    }
}