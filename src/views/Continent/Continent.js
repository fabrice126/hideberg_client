import React, { Component } from 'react';
import './Continent.css';
import HBmap from '../../components/HBmap/HBmap';

export default class Continent extends Component {
    render() {
        const { continent } = this.props.match.params;
        return (
            <div className="Continent">
                <section>
                    {(continent) ? <HBmap continent={continent} /> : <HBmap />}
                </section>
            </div>
        );
    }
}
