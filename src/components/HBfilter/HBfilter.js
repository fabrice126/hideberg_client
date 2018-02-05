import React, { Component } from 'react';
import './HBfilter.css';
import { Link } from 'react-router-dom';

class HBfilter extends Component {
    constructor(props) {
        super(props);

        const { continent } = this.props;
        console.log(continent);
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
            <div className="div-home-HBfilter">
                {/* <select className={this.state.hiddenSelectCountry} onChange={(evt) => { this.selectedCountry(evt) }}>{this.state.divFilters.selectCountry}</select> */}
                <div>
                    <input type="text" id="myInput" onKeyUp={(evt) => { this.myFunction(evt) }} placeholder="Search for names.." title="Type in a name" />
                    {/* <ul id="myUL">{this.state.divFilters.selectCountry}</ul> */}
                </div>
            </div>
        )
    }
}
export default HBfilter;