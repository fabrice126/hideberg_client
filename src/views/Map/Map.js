import React, { Component } from 'react';
import './Map.css';
import HBheader from '../../components/HBheader/HBheader';
import HBfooter from '../../components/HBfooter/HBfooter';
import HBmap from '../../components/HBmap/HBmap';

export default class Map extends Component {
    render() {
        return (
            <div className="Map">
                <HBheader />

                <section>
                    <HBmap imgpath="./images/map/" continent="europe" />
                    {/* <img src="./images/map/world_empty.png" /> */}
                </section>

                <HBfooter />
            </div>
        );
    }
}
