import React, { Component } from 'react';
import './HBmap.css';
import confMAP from './HBmap_conf.js';
import { Link } from 'react-router-dom';

class HBmap extends Component {
    constructor(props) {
        super(props);

        this.availableCountries = ['france'];
        this.availableContinents = ['europe'];

        const { continent } = this.props;
        this.imgpath = "/images/map/";
        this.state = this.loadMapConfig(continent);
    }

    componentWillReceiveProps(nextProps, nextState) {
        const { continent } = nextProps;
        if (continent !== this.props.continent) {
            const configMap = this.loadMapConfig(continent);
            this.setState(configMap);
        }
    }

    loadMapConfig = (continent) => {
        console.log("continent", continent);
        return {
            continent: continent,
            imgsrc: (continent) ? this.imgpath + "continents/" + continent + "/" + continent + "_empty.png" : this.imgpath + "world_empty.png",
            data: (continent) ? confMAP[continent].countries : confMAP,
            classContinent: (continent) ? "classContinent" : "",
            sp_select: (continent) ? "2. Sélectionner le pays de votre choix." : "1. Sélectionner le continent où vous souhaitez travailler",
            divFilters: this.loadMapFilters(continent),
            selectCountry: [],
            hidden: (continent) ? "hidden" : "",
            hiddenSelectCountry: (continent) ? "" : "hidden"
        }
    }

    changeImgPath(c) {
        const { continent } = this.state;
        if (continent) {
            this.setState({
                imgsrc: this.imgpath + "continents/" + continent + "/" + continent + "_" + c + ".png"
            })
        } else {
            this.setState({
                imgsrc: this.imgpath + "world_" + c + ".png"
            })
        }
    }

    loadMapFilters(continent) {
        let _data = (continent) ? confMAP[continent].countries : confMAP;
        let _imgwidth = (continent) ? (100 / 854) : (100 / 1280);
        let _minRatio = (continent) ? (1.27) : (2.19);
        console.log("loadMapFilters");
        console.log(this.state);

        let liStyle = {};
        let _to = "";
        let divFilters = [];
        let selectCountry = [];
        for (let c in _data) {
            liStyle = {
                bottom: (_data[c].bottom * (_imgwidth)) * _minRatio + "%",
                left: (_data[c].left * (_imgwidth)) + "%",
                width: (_data[c].width * (_imgwidth)) + "%",
                height: (_data[c].height * (_imgwidth)) * _minRatio + "%"
            }
            _to = continent ? { pathname: `/country/${c}/sector/design` } : { pathname: `/continent/${c}` };

            if (continent) {
                if (this.availableCountries.indexOf(c) === -1) _to = { pathname: `/404`, errMsg: "Ce pays arrivera bientôt" };
                //selectCountry.push(<option key={"option_" + c}>{c}</option>);
                selectCountry.push(<li key={"option_" + c}><a href="#">{c}</a></li>);
            } else {
                //if (!_data[c].countries) _to = { pathname: `/404`, errMsg: "Ce continent arrivera bientôt" };
                if (this.availableContinents.indexOf(c) === -1) _to = { pathname: `/404`, errMsg: "Ce continent arrivera bientôt" };
            }
            console.log(c);
            divFilters.push(
                <Link key={"div_" + c} to={_to}>
                    <div key={"div_" + c} id={"div_" + c} className="div_filter" style={liStyle}
                        onMouseEnter={(evt) => this.changeImgPath(c)}
                        onMouseLeave={(evt) => this.changeImgPath("empty")}>
                    </div>
                </Link>
            );
        }
        return { divFilters, selectCountry };
    }

    selectedCountry(evt) {
        let c = (evt.target.value);
        let _to = { pathname: `/country/${c}/sector/design`, errMsg: '' };
        if (c !== "france") _to = { pathname: `/404`, errMsg: "Ce pays arrivera bientôt" };
        console.log(_to);
    }

    myFunction(evt) {
        var filter, ul, li, a, i;
        filter = evt.target.value.toUpperCase();
        ul = document.querySelector("#myUL");
        console.log(ul);
        li = ul.querySelectorAll("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
    
            }
        }
    }

    render() {

        return (
            <div className="div-home-HBmap">
                <span className={"sp_success " + this.state.hidden}>Émerger votre emploi à l'international.</span>
                <span className="sp_select">{this.state.sp_select}</span>
                {/* <select className={this.state.hiddenSelectCountry} onChange={(evt) => { this.selectedCountry(evt) }}>{this.state.divFilters.selectCountry}</select> */}
                {/* <div>
                    <input type="text" id="myInput" onKeyUp={(evt) => { this.myFunction(evt) }} placeholder="Search for names.." title="Type in a name" />
                    <ul id="myUL">{this.state.divFilters.selectCountry}</ul>
                </div> */}
                <div className={"div_map " + this.state.classContinent}>
                    {this.state.divFilters.divFilters}
                    <img id="img_map" src={this.state.imgsrc} alt="map" />
                </div>
            </div>
        )
    }
}
export default HBmap;