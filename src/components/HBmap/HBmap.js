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
                sp_select:"2. Select the country"
            }
        } else {
            confState = {
                imgsrc: this.imgpath + "world" + "_empty.png",
                data: confMAP,
                continent: "",
                imgwidth: (100 / 1280),
                minRatio: (2.19),
                classContinent: "",
                sp_select:"1. Select the continent where you would like work"
            }
        }
        if (_init) this.state = confState;
        else this.setState(confState);
    }


    changeImgPath(c) {
        if (this.state.continent) {
            this.setState({
                imgsrc: this.imgpath + "continents/" + this.state.continent + "/" + this.state.continent + "_" + c + ".png"
            })
        } else {
            this.setState({
                imgsrc: this.imgpath + "world_" + c + ".png"
            })
        }
    }

    goToSW(c) {
        console.log(c);
        if (c == "france") {
            console.log('go go: ' + c);
        } else {
            alert('coming soon for ' + c + ' !');
        }
    }

    render() {
        let ratio = this.state.imgwidth;
        let _data = this.state.data;
        let divFilters = [];
        let liStyle = {};
        let clickMapFunc = "";
        for (let c in _data) {
            liStyle = {
                bottom: (_data[c].bottom * ratio)*this.state.minRatio + "%",
                left: (_data[c].left * ratio) + "%",
                width: (_data[c].width * ratio) + "%",
                height: (_data[c].height * ratio)*this.state.minRatio + "%"
            }
            if (this.state.continent) clickMapFunc = (evt) => this.goToSW(c);
            else clickMapFunc = (evt) => this.loadMap(false, c);

            divFilters.push(<div key={"div_" + c} id={"div_" + c} className="div_filter" style={liStyle} onMouseEnter={(evt) => this.changeImgPath(c)} onMouseLeave={(evt) => this.changeImgPath("empty")} onClick={clickMapFunc}></div>);
        }

        return (
            <div className="div-app-HBmap">
                <span className="sp_success">Your sucess start here.</span>
                <span className="sp_select">{this.state.sp_select}</span>
                <div className={"div_map "+this.state.classContinent}>
                    {divFilters}
                    <img id="img_map" ref={(div) => { this.imgMap = div; }} src={this.state.imgsrc} />
                </div>
            </div>
        )
    }
}
export default HBmap;