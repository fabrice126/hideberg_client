import React, { Component } from 'react';
import './Page404.css';
import HBheader from '../../components/HBheader/HBheader';
import HBfooter from '../../components/HBfooter/HBfooter';
// import HBmap from '../../components/HBmap/HBmap';

export default class Page404 extends Component {
    render() {

        return (
            <div className="Page404">
                <HBheader />

                <section className="section-Page404">
                    <span>404 <br/>not found</span>
                </section>

                <HBfooter />
            </div>
        );
    }
}
