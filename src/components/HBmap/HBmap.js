import React, { Component } from 'react';
import './HBmap.css';
import confMAP from './HBmap_conf.js';
import { Link } from 'react-router-dom';

class HBmap extends Component {
    constructor(props) {
        super(props);
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
        return {
            continent: continent,
            imgsrc: (continent) ? this.imgpath + "continents/" + continent + "/" + continent + "_empty.png" : this.imgpath + "world_empty.png",
            data: (continent) ? confMAP[continent].countries : confMAP,
            imgwidth: (continent) ? (100 / 854) : (100 / 1280),
            minRatio: (continent) ? (1.27) : (2.19),
            classContinent: (continent) ? "classContinent" : "",
            sp_select: (continent) ? "2. Select the country" : "1. Select the continent where you would like work"
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

    render() {
        let { data: _data, minRatio, continent } = this.state;
        if(continent && continent !== "europe") return <div> Ce continent arrive bientôt </div>
        let ratio = this.state.imgwidth;
        let divFilters = [];
        let liStyle = {};
        for (let c in _data) {
            console.log(c);
            liStyle = {
                bottom: (_data[c].bottom * ratio) * minRatio + "%",
                left: (_data[c].left * ratio) + "%",
                width: (_data[c].width * ratio) + "%",
                height: (_data[c].height * ratio) * minRatio + "%"
            }
            divFilters.push(
                <Link key={"div_" + c} to={continent ? { pathname: `/home/${c}` } : { pathname: `/world/${c}` }}>
                    <div key={"div_" + c} id={"div_" + c} className="div_filter" style={liStyle}
                        onMouseEnter={(evt) => this.changeImgPath(c)}
                        onMouseLeave={(evt) => this.changeImgPath("empty")}>
                    </div>
                </Link>
            );
        }

        return (
            <div className="div-home-HBmap">
                <span className="sp_success">Your sucess start here.</span>
                <span className="sp_select">{this.state.sp_select}</span>
                <div className={"div_map " + this.state.classContinent}>
                    {divFilters}
                    <img id="img_map" src={this.state.imgsrc} alt="map" />
                </div>
            </div>
        )
    }
}
export default HBmap;