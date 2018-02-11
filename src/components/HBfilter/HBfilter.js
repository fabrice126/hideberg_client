import React, { Component } from 'react';
import './HBfilter.css';
import confMAP from '../HBmap/HBmap_conf.js';

class HBfilter extends Component {
    constructor(props) {
        super(props);

        const { continent } = this.props;
        this.list="";
        
        let countries = Object.keys(confMAP[continent].countries);
        this.list=countries.map(
            (elem,index)=>{
                return <li key={"li_"+index}><a href={`/country/${elem}/sector/design`}>{elem}</a></li>;
            }
        )
    }


    myFunction(evt) {
        var filter, ul, li, a, i;
        filter = evt.target.value.toUpperCase();
        ul = document.querySelector("#myUL");
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
            <div className="div-home-HBfilter">
                <div>
                    <input type="text" id="myInput" onKeyUp={(evt) => { this.myFunction(evt) }} placeholder="Rechercher un pays ..." title="Type in a name" />
                    <ul ref="myUL" id="myUL">{this.list}</ul>
                </div>
            </div>
        )
    }
}
export default HBfilter;