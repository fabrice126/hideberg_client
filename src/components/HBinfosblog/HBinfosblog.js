import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './HBinfosblog.css';

class HBinfosblog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            elementsJSON:""
        }
    }


    componentDidMount() {
        let _url = `http://localhost:5001/api/continent/europe/country/france/infos`;
        fetch(_url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    elementsJSON: data
                });
            });
    }

    render() {
        let links = this.state.elementsJSON;
        let link="";
        let tabLinks = [];
        let linkEmpty={ pathname: `/404`, errMsg: "Ce lien arrivera bientôt" };

        for (let i in links){
            link=links[i];

            tabLinks.push(
                <Link to={link.country_link_cv || linkEmpty} target="_blank" key={"a_visa"}>
                    <img src={"/images/icons/visa.png"} alt={"a_visa"} />
                    <span>visa</span>
                </Link>
            );
            tabLinks.push(
                <Link to={link.country_link_diplomatic || linkEmpty} target="_blank" key={"a_cv"}>
                    <img src={"/images/icons/cv.png"} alt={"a_cv"} />
                    <span>cv</span>
                </Link>
            );
            tabLinks.push(
                <Link to={link.country_link_politic || linkEmpty} target="_blank" key={"a_news"}>
                    <img src={"/images/icons/news.png"} alt={"a_news"} />
                    <span>news</span>
                </Link>
            );
        }
        
                
        return (
            <div className="div-home-HBinfosblog">
                <span className="aside_title">{this.props.name}</span>
                <nav id="nav_linkcountry">{tabLinks}</nav>
            </div>
        )
    }
}
export default HBinfosblog;