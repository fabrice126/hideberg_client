import React, { Component } from 'react';
import './HBmap.css';
import confMAP from './HBmap_conf.js';
import { Link } from 'react-router-dom';
import HBpopup from '../../components/HBpopup/HBpopup';

class HBmap extends Component {
    constructor(props) {
        super(props);

        this.availableCountries = ['france'];
        this.availableContinents = ['europe'];

        const { continent } = this.props;
        this.imgpath = "/images/map/";

        this.popupMsg = "";
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
        return {
            continent: continent,
            imgsrc: (continent) ? this.imgpath + "continents/" + continent + "/" + continent + "_empty.png" : this.imgpath + "world_empty.png",
            data: (continent) ? confMAP[continent].countries : confMAP,
            classContinent: (continent) ? "classContinent" : "",
            sp_select: (continent) ? "2. Sélectionner le pays de votre choix." : "1. Sélectionner le continent où vous souhaitez travailler",
            divFilters: this.loadMapFilters(continent),
            selectCountry: [],
            hidden: (continent) ? "hidden" : "",
            hiddenSelectCountry: (continent) ? "" : "hidden",
            popupMsg: this.popupMsg
        }
    }

    changeImgPath(c) {
        const { continent } = this.state;
        if (continent) {
            // this.setState({
            //     imgsrc: this.imgpath + "continents/" + continent + "/" + continent + "_" + c + ".png"
            // })
            this.refs.img_map.src = this.imgpath + "continents/" + continent + "/" + continent + "_" + c + ".png";
        } else {
            // this.setState({
            //     imgsrc: this.imgpath + "world_" + c + ".png"
            // })
            this.refs.img_map.src = this.imgpath + "world_" + c + ".png";
        }
    }

    loadMapFilters(continent) {
        let _data = (continent) ? confMAP[continent].countries : confMAP;
        let _imgwidth = (continent) ? (100 / 854) : (100 / 1280);
        let _minRatio = (continent) ? (1.27) : (2.19);

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
                if (this.availableCountries.indexOf(c) === -1) _to = "#";
                //selectCountry.push(<option key={"option_" + c}>{c}</option>);
                //selectCountry.push(<li key={"option_" + c}><a href="#">{c}</a></li>);
            } else {
                //if (!_data[c].countries) _to = { pathname: `/404`, errMsg: "Ce continent arrivera bientôt" };
                if (this.availableContinents.indexOf(c) === -1) _to = "#";
            }
            if (_to === "#") {
                divFilters.push(
                    <button key={"div_" + c} onClick={() => this.openPopup(continent)}>
                        <div key={"div_" + c} id={"div_" + c} className="div_filter" style={liStyle}
                            onMouseEnter={(evt) => this.changeImgPath(c)}
                            onMouseLeave={(evt) => this.changeImgPath("empty")}>
                        </div>
                    </button>
                );
            } else {
                divFilters.push(
                    <Link key={"div_" + c} to={_to}>
                        <div key={"div_" + c} id={"div_" + c} className="div_filter" style={liStyle}
                            onMouseEnter={(evt) => this.changeImgPath(c)}
                            onMouseLeave={(evt) => this.changeImgPath("empty")}>
                        </div>
                    </Link>
                );
            }
        }
        return { divFilters, selectCountry };
    }

    openPopup(_continent) {
        let _msg = "Oups ! Ce lien n'est pas encore disponible";
        // if(_continent){
        //     _msg="Ce pays arrivera bientôt";
        // }
        this.setState({
            popupMsg: _msg
        })
    }

    closePopup() {
        this.setState({
            popupMsg: ""
        })
    }

    render() {
        return (
            <div className="div-home-HBmap">
                {
                    (this.state.popupMsg) ? <div onClick={() => this.closePopup()}><HBpopup msg={this.state.popupMsg} /></div> : ""
                }
                <span className={"sp_success " + this.state.hidden}>Émerger votre emploi à l'international.</span>
                <span className="sp_select">{this.state.sp_select}</span>
                <div className={"div_map " + this.state.classContinent}>
                    {this.state.divFilters.divFilters}
                    <img id="img_map" ref="img_map" src={this.state.imgsrc} alt="map" />
                </div>
            </div>
        )
    }
}
export default HBmap;