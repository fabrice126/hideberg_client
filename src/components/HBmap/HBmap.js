import React, { Component } from 'react';
import './HBmap.css';
import confMAP from './HBmap_conf.js';

class HBmap extends Component {
    constructor(props) {
        super(props);

        this.imgpath = "./images/map/";
        this.loadMap(true, this.props.continent)
    }

    loadMap(_init, _continent) {
        console.log(this.imgMap);
        let confState = {};
        if (_continent) {
            confState = {
                imgsrc: this.imgpath + "continents/" + _continent + "/" + _continent + "_empty.png",
                data: confMAP[_continent].countries,
                continent: _continent,
                imgwidth: (100 / 854),
                minRatio: (1.27),
                classContinent: "classContinent",
                sp_select: "2. Select the country"
            }
        } else {
            confState = {
                imgsrc: this.imgpath + "world_empty.png",
                data: confMAP,
                continent: "",
                imgwidth: (100 / 1280),
                minRatio: (2.19),
                classContinent: "",
                sp_select: "1. Select the continent where you would like work"
            }
        }
        if (_init) this.setState(confState);
        else this.setState(confState);
    }


    changeImgPath(c) {
        const continent = this.state
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

    goToSW(c) {
        console.log(c);
        if (c === "france") {
            console.log('go go: ' + c);
        } else {
            alert('coming soon for ' + c + ' !');
        }
    }

    render() {
        let { imgwidth: ratio, data: _data, minRatio, continent } = this.state;
        let divFilters = [];
        let liStyle = {};
        let clickMapFunc = "";
        for (let c in _data) {
            liStyle = {
                bottom: (_data[c].bottom * ratio) * minRatio + "%",
                left: (_data[c].left * ratio) + "%",
                width: (_data[c].width * ratio) + "%",
                height: (_data[c].height * ratio) * minRatio + "%"
            }
            if (continent) clickMapFunc = (evt) => this.goToSW(c);
            else clickMapFunc = (evt) => this.loadMap(false, c);

            divFilters.push(
                <div key={"div_" + c} id={"div_" + c} className="div_filter" style={liStyle} 
                    onMouseEnter={(evt) => this.changeImgPath(c)} 
                    onMouseLeave={(evt) => this.changeImgPath("empty")} 
                    onClick={clickMapFunc}>
                </div>
            );
        }

        return (
            <div className="div-home-HBmap">
                <span className="sp_success">Your sucess start here.</span>
                <span className="sp_select">{this.state.sp_select}</span>
                <div className={"div_map " + this.state.classContinent}>
                    {divFilters}
                    <img id="img_map" ref={(div) => { this.imgMap = div; }} src={this.state.imgsrc} alt="map" />
                </div>
            </div>
        )
    }
}
export default HBmap;