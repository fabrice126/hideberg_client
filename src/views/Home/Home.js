import React, { Component } from 'react';
import './Home.css';
import HBwebsites from '../../components/HBwebsites/HBwebsites';
import HBinfosblog from '../../components/HBinfosblog/HBinfosblog';
import HBmapcountry from '../../components/HBmapcountry/HBmapcountry';
import HBtabs from '../../components/HBtabs/HBtabs';
import HBheader from '../../components/HBheader/HBheader';
import HBfooter from '../../components/HBfooter/HBfooter';
// import HBmap from '../../components/HBmap/HBmap';

export default class Home extends Component {
    render() {
        let elementsAnnonce = Array(4).fill('annonce');
        let elementsLinksWeb = Array(38).fill('link');
        let elementsLinksBlogs = {
            visa: "visa",
            cv: "cv",
            news: "news"
        };
        let elementsCountry = {
            country: "france"
        };
        let elementsSectorTabs = ["design", "engineer", "finance", "marketing", "programs", "architectures"];
        let elementsSectorContents = [
            <HBwebsites key={"pg_design"} duration="5" elements={elementsLinksWeb} nbElementsPerPage='25' />,
            <HBwebsites key={"pg_engineer"} elements={elementsLinksWeb} nbElementsPerPage='25' />,
            <HBwebsites key={"pg_finance"} elements={elementsLinksWeb} nbElementsPerPage='25' />,
            <HBwebsites key={"pg_marketing"} elements={elementsLinksWeb} nbElementsPerPage='25' />,
            <HBwebsites key={"pg_programs"} elements={elementsLinksWeb} nbElementsPerPage='25' />,
            <HBwebsites key={"pg_architectures"} elements={elementsLinksWeb} nbElementsPerPage='25' />];

        return (
            <div className="Home">
                <HBheader />

                <section>
                    {/* <HBmap imgpath="./images/map/" continent="europe" /> */}
                    <aside className="home-aside">
                        <HBmapcountry key={"blockcountry"} elements={elementsCountry} />
                        <HBwebsites key={"pg_1"} elements={elementsAnnonce} nbElementsPerPage='1' duration="4" />
                    </aside>

                    <article className="home-article">
                        <HBtabs elements={elementsSectorTabs} contents={elementsSectorContents} />
                    </article>

                    <aside className="home-aside">
                        <HBinfosblog key={"blocklinks"} name="blog info" elements={elementsLinksBlogs} />
                    </aside>
                </section>

                <HBfooter />
            </div>
        );
    }
}
