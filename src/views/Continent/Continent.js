import React, { Component } from 'react';
import '../../index.css';
import './Continent.css';
import HBmap from '../../components/HBmap/HBmap';
import HBcomeback from '../../components/HBcomeback/HBcomeback';
import HBannonces from '../../components/HBannonces/HBannonces';
import HBfilter from '../../components/HBfilter/HBfilter';

export default class Continent extends Component {
    render() {
        let elementsAnnonce = Array(4).fill('annonce');
        const { continent } = this.props.match.params;
        return (
            <div className="Continent">
                <section>
                    {(continent) ? <HBfilter continent={continent} /> : ""}
                    {(continent) ? <HBmap continent={continent} /> : <HBmap />}
                    {(continent) ? <HBannonces  key={"pg_1"}  sector="design" elements={elementsAnnonce} nbElementsPerPage='1' duration="4" /> : ""}
                </section>
                {(continent) ? <HBcomeback _to="/" /> : ""}
            </div>
        );
    }
}
