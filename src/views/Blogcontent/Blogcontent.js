import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import './Blogcontent.css';

export default class Blogcontent extends Component {
    constructor(props) {
        super(props);
        this.tcountries = ["cv", "visa", ""];
        this.state = {
            wellSubscribe: false,
        }
    }

    componentDidMount = () => {

    }

    active(e){
        console.log(e);
        console.log(e.currentTarget.dataset.id);
        //(this.refs.ul_bloginfos).
    }

    render() {
        let elementsCountry = {
            continent: this.props.match.params.continent || "europe",
            country: this.props.match.params.country || "france"
        };
        let _ul={
            li:{
                id:"li_cv",
                icon:"cv"
            }
        }
        let _urlShare={
            fb:{
                url:`https://www.facebook.com/sharer/sharer.php?u=http%3A//localhost%3A3001/blog/${elementsCountry.continent}/${elementsCountry.country}/cv`,
                title:`Partager sur Facebook`
            }
        }
        console.log(_ul);
        console.log("elementsCountry", this.props.match.params);
        return (
            <div className="div-home-HBblogcontent">
                <header className={"li_" + elementsCountry.country}><span>{elementsCountry.country}</span></header>
                <section>
                    <article className="">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                        <nav>
                            <a href={_urlShare.fb.url} title={_urlShare.fb.title} target='_blank'><i className="flaticon-square"></i> </a>
                        </nav>
                    </article>
                    <nav>
                    <ul id="ul_bloginfos" className="ul_bloginfos" ref="ul_bloginfos">
                        <li data-id="li_cv" className="active" onClick={this.active.bind(this)}><i className="material-icons">favorite_border</i><span><i className="flaticon-technology"></i> cv</span></li>
                        <li data-id="li_visa" onClick={this.active.bind(this)}><i className="material-icons">favorite_border</i><span><i className="flaticon-technology"></i> visa</span></li>
                        <li data-id="li_news" onClick={this.active.bind(this)}><i className="material-icons">favorite_border</i><span><i className="flaticon-interface"></i> actualité</span></li>
                        <li data-id="li_work" onClick={this.active.bind(this)}><i className="material-icons">favorite_border</i><span><i className="material-icons">work</i> emplois</span></li>
                    </ul>
                    <nav>
                    <Link to={"#"}>{elementsCountry.continent}</Link>
                    <Link to={"#"}>{elementsCountry.country}</Link>
                    </nav>
                    </nav>
                </section>
            </div>
        )
    }
}